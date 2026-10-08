import re
from typing import Dict, Any, List, Optional
from app.rag.retriever import ChromaRetriever
from app.llm.gemini_llm import LLMClient
from app.calendar.google_calendar import GoogleCalendarService
from app.models.schemas import ChatResponse, SourceItem, CalendarBookingDetails

class RAGPipeline:
    """Core RAG Orchestrator handling semantic retrieval, prompt building, and response synthesis."""

    SYSTEM_PROMPT = """You are Nexyro AI, the official AI assistant for Nexyro IT (a software development and digital transformation agency based in Islamabad, Pakistan).

CRITICAL INSTRUCTIONS:
1. Use ONLY the provided Context Information to answer user questions about Nexyro IT, its services, projects, development capabilities, process, FAQs, and contact information.
2. DO NOT invent or assume any company details, services, team members, or pricing not present in the context.
3. If the user question cannot be answered using the provided context, state clearly and politely: "I don't have enough information in my knowledge base to answer your question." Then offer the user options to contact Nexyro IT via email (nexyroit@gmail.com) or phone/WhatsApp (+92 3221793231), or offer to schedule a consultation.
4. Maintain a professional, friendly, helpful, and branded tone.
5. If the user asks to schedule, book, or request a consultation/call, guide them politely through the consultation booking steps (asking for Name, Email, Project Type, and Preferred Date/Time).
"""

    def __init__(self):
        self.retriever = ChromaRetriever()
        self.llm = LLMClient()
        self.calendar_service = GoogleCalendarService()

    def process_chat(self, user_message: str, conversation_history: List[Dict[str, str]] = None) -> ChatResponse:
        message_lower = user_message.lower().strip()

        # Check for calendar booking intent
        booking_keywords = ["book", "schedule", "consultation", "appointment", "meeting", "call"]
        is_booking_intent = any(k in message_lower for k in booking_keywords)

        # 1. Search Vector DB for context
        retrieved_items = self.retriever.search_similar(user_message, top_k=4)
        
        # Build context text & sources list
        sources_map = {}
        context_blocks = []
        for idx, item in enumerate(retrieved_items):
            src_name = item["metadata"].get("source", "Nexyro IT Website")
            clean_src = src_name.replace(".txt", "").replace(".md", "").replace("_", " ").title()
            # Standardize user display name
            if "01" in src_name or "Company" in src_name:
                display_src = "Nexyro IT Overview"
            elif "02" in src_name or "Services" in src_name:
                display_src = "Nexyro IT Services"
            elif "03" in src_name or "Projects" in src_name:
                display_src = "Nexyro IT Projects & Portfolio"
            elif "04" in src_name or "Process" in src_name:
                display_src = "Nexyro IT Process & Tech Stack"
            elif "05" in src_name or "Faq" in src_name:
                display_src = "Nexyro IT FAQs"
            else:
                display_src = "Nexyro IT Website"

            sources_map[display_src] = SourceItem(
                source=display_src,
                title=item.get("title"),
                snippet=item["content"][:120] + "..."
            )
            context_blocks.append(f"[Source: {display_src}]\n{item['content']}")

        sources_list = list(sources_map.values())
        context_str = "\n\n".join(context_blocks) if context_blocks else "No relevant information found in knowledge base."

        # 2. Build LLM Prompt
        prompt = f"""CONTEXT INFORMATION:
{context_str}

USER QUESTION:
{user_message}

Provide a clear, accurate, and structured answer based strictly on the context above."""

        # 3. Call LLM
        answer = self.llm.generate_response(prompt, system_instruction=self.SYSTEM_PROMPT)

        # 4. Handle calendar booking metadata
        booking_context = None
        if is_booking_intent:
            today_str = "2026-10-09"
            available_slots = self.calendar_service.get_available_slots(today_str)
            booking_context = CalendarBookingDetails(
                is_booking_intent=True,
                step="request_info",
                available_slots=available_slots,
                selected_date=today_str
            )
            if not answer or len(answer) < 30:
                answer = "I would be happy to help you schedule a consultation with Nexyro IT!\n\nTo get started, please provide:\n1. Your Name\n2. Your Email Address\n3. Short project description / requirements\n4. Preferred date & time"

        # Check if response indicates missing information
        has_sufficient_info = True
        missing_phrases = ["don't have enough information", "don't have information", "not found in my knowledge base"]
        if any(p in answer.lower() for p in missing_phrases):
            has_sufficient_info = False

        return ChatResponse(
            answer=answer,
            sources=sources_list,
            booking_context=booking_context,
            has_sufficient_info=has_sufficient_info
        )
