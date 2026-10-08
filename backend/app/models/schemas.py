from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class ChatMessage(BaseModel):
    role: str # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    message: str
    conversation_history: Optional[List[ChatMessage]] = []

class SourceItem(BaseModel):
    source: str
    title: Optional[str] = None
    snippet: Optional[str] = None

class CalendarBookingDetails(BaseModel):
    is_booking_intent: bool = False
    step: Optional[str] = None # "request_info", "show_slots", "awaiting_confirmation", "confirmed"
    available_slots: Optional[List[str]] = []
    selected_date: Optional[str] = None
    selected_time: Optional[str] = None
    client_name: Optional[str] = None
    client_email: Optional[str] = None
    project_requirements: Optional[str] = None

class ChatResponse(BaseModel):
    answer: str
    sources: List[SourceItem] = []
    booking_context: Optional[CalendarBookingDetails] = None
    has_sufficient_info: bool = True

class IngestResponse(BaseModel):
    status: str
    documents_ingested: int
    chunks_created: int
    message: str

class CalendarAvailabilityRequest(BaseModel):
    date: str # YYYY-MM-DD format

class CalendarAvailabilityResponse(BaseModel):
    date: str
    available_slots: List[str]

class CalendarBookingRequest(BaseModel):
    name: str
    email: str
    project_requirement: str
    date: str # YYYY-MM-DD
    time: str # e.g. "02:00 PM"
    confirmed: bool = False

class CalendarBookingResponse(BaseModel):
    success: bool
    message: str
    event_id: Optional[str] = None
    booking_details: Optional[Dict[str, Any]] = None

class HealthResponse(BaseModel):
    status: str
    version: str
    knowledge_base_status: str
    vector_db_chunks: int
