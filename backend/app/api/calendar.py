from fastapi import APIRouter, HTTPException, Query
from app.models.schemas import (
    CalendarAvailabilityResponse,
    CalendarBookingRequest,
    CalendarBookingResponse
)
from app.calendar.google_calendar import GoogleCalendarService

router = APIRouter(prefix="/api/calendar", tags=["Calendar"])
calendar_service = GoogleCalendarService()

@router.get("/availability", response_model=CalendarAvailabilityResponse)
async def get_availability(date: str = Query(..., description="Date in YYYY-MM-DD format")):
    try:
        slots = calendar_service.get_available_slots(date)
        return CalendarAvailabilityResponse(date=date, available_slots=slots)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to check calendar availability: {str(e)}")

@router.post("/book", response_model=CalendarBookingResponse)
async def book_consultation(request: CalendarBookingRequest):
    if not request.confirmed:
        raise HTTPException(
            status_code=400,
            detail="Calendar event creation requires explicit user confirmation (confirmed=true)."
        )

    if not request.name or not request.email or not request.project_requirement:
        raise HTTPException(
            status_code=400,
            detail="Missing required fields. Name, email, and project requirement are mandatory."
        )

    try:
        result = calendar_service.book_consultation(
            name=request.name,
            email=request.email,
            project_requirement=request.project_requirement,
            date_str=request.date,
            time_str=request.time,
            confirmed=request.confirmed
        )
        return CalendarBookingResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Calendar booking failed: {str(e)}")
