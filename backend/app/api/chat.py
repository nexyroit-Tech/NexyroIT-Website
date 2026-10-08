from fastapi import APIRouter, HTTPException
from app.models.schemas import ChatRequest, ChatResponse
from app.rag.pipeline import RAGPipeline

router = APIRouter(prefix="/api", tags=["Chat"])
pipeline = RAGPipeline()

@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    if not request.message or not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
    
    try:
        history = [msg.model_dump() for msg in request.conversation_history] if request.conversation_history else []
        response = pipeline.process_chat(request.message, history)
        return response
    except Exception as e:
        print(f"Error in /api/chat: {e}")
        raise HTTPException(status_code=500, detail=f"Internal RAG processing error: {str(e)}")
