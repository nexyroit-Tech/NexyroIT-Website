from fastapi import APIRouter
from app.models.schemas import HealthResponse
from app.rag.retriever import ChromaRetriever

router = APIRouter(prefix="/api", tags=["Health"])
retriever = ChromaRetriever()

@router.get("/health", response_model=HealthResponse)
async def health_check():
    count = retriever.get_count()
    kb_status = "ready" if count > 0 else "empty (ingestion recommended)"
    return HealthResponse(
        status="ok",
        version="1.0.0",
        knowledge_base_status=kb_status,
        vector_db_chunks=count
    )
