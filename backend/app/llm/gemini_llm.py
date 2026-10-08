import os
import json
from typing import List, Dict, Any, Optional
import requests
from app.config import settings

class LLMClient:
    """Robust client for LLM interaction supporting Gemini REST API and OpenAI API."""

    def __init__(self):
        self.provider = settings.LLM_PROVIDER.lower()
        self.gemini_key = settings.GEMINI_API_KEY or os.environ.get("GEMINI_API_KEY", "")
        self.openai_key = settings.OPENAI_API_KEY or os.environ.get("OPENAI_API_KEY", "")

    def generate_response(self, prompt: str, system_instruction: Optional[str] = None) -> str:
        # Try Gemini API if key exists
        if self.gemini_key:
            try:
                # Call Gemini REST API directly (works with any Python version without protobuf conflicts)
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={self.gemini_key}"
                headers = {"Content-Type": "application/json"}
                
                payload: Dict[str, Any] = {
                    "contents": [
                        {
                            "parts": [{"text": prompt}]
                        }
                    ],
                    "generationConfig": {
                        "temperature": 0.2,
                        "maxOutputTokens": 1000
                    }
                }
                
                if system_instruction:
                    payload["systemInstruction"] = {
                        "parts": [{"text": system_instruction}]
                    }

                res = requests.post(url, headers=headers, json=payload, timeout=25)
                if res.status_code == 200:
                    data = res.json()
                    candidates = data.get("candidates", [])
                    if candidates:
                        parts = candidates[0].get("content", {}).get("parts", [])
                        if parts and "text" in parts[0]:
                            return parts[0]["text"].strip()
                else:
                    print(f"Gemini API returned status {res.status_code}: {res.text}")
            except Exception as e:
                print(f"Gemini LLM generation error: {e}")

        # Try OpenAI API if key exists and provider is set to openai
        if self.openai_key and self.provider == "openai":
            try:
                headers = {
                    "Authorization": f"Bearer {self.openai_key}",
                    "Content-Type": "application/json"
                }
                messages = []
                if system_instruction:
                    messages.append({"role": "system", "content": system_instruction})
                messages.append({"role": "user", "content": prompt})

                payload = {
                    "model": "gpt-3.5-turbo",
                    "messages": messages,
                    "temperature": 0.2
                }
                res = requests.post("https://api.openai.com/v1/chat/completions", json=payload, headers=headers, timeout=15)
                if res.status_code == 200:
                    return res.json()["choices"][0]["message"]["content"].strip()
            except Exception as e:
                print(f"OpenAI LLM generation error: {e}")

        # Fallback intelligent generator for development / when API key is missing
        return self._smart_fallback_response(prompt)

    def _smart_fallback_response(self, prompt: str) -> str:
        """Fallback response generator using rule-based synthesis over retrieved context."""
        if "CONTEXT INFORMATION:" in prompt:
            context_part = prompt.split("CONTEXT INFORMATION:")[1].split("USER QUESTION:")[0].strip()
            
            if not context_part or "No relevant information" in context_part:
                return (
                    "I don't have enough specific information in my knowledge base to answer your request thoroughly.\n\n"
                    "Please feel free to contact the Nexyro IT team directly:\n"
                    "• Email: nexyroit@gmail.com\n"
                    "• WhatsApp / Phone: +92 3221793231\n"
                    "• Website Contact: https://nexyroit.com/contact\n\n"
                    "Would you like me to help schedule a free consultation with our team?"
                )

            # Synthesize answer directly from context
            clean_lines = [line.strip() for line in context_part.split("\n") if line.strip() and not line.startswith("[Source:")]
            summary = "\n".join(clean_lines[:8])
            return f"{summary}\n\nFor further customization or details, feel free to schedule a consultation with our team!"

        return "Thank you for reaching out to Nexyro IT! How can I assist you with your web, mobile, or software project today?"
