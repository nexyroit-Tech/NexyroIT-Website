import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api.chat import router as chat_router
from app.api.documents import router as documents_router
from app.api.calendar import router as calendar_router
from app.api.health import router as health_router
from app.rag.retriever import ChromaRetriever
from app.documents.loader import DocumentLoader
from app.documents.chunker import DocumentChunker

app = FastAPI(
    title="Nexyro IT AI Assistant RAG Backend",
    description="Production-ready FastAPI RAG & Google Calendar scheduling API for Nexyro IT",
    version="1.0.0"
)

# CORS setup
allowed_origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://nexyroit.com",
    "https://nexyro-it-website.vercel.app",
]
for o in settings.cors_origins_list:
    if o != "*" and o not in allowed_origins:
        allowed_origins.append(o)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"https?://(localhost|127\.0\.0\.1)(:\d+)?|https://.*\.vercel\.app|https://.*\.nexyroit\.com",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(chat_router)
app.include_router(documents_router)
app.include_router(calendar_router)
app.include_router(health_router)

@app.on_event("startup")
async def startup_event():
    """Auto-ingest knowledge base documents into ChromaDB on startup if vector DB is empty."""
    retriever = ChromaRetriever()
    if retriever.get_count() == 0:
        print("[Startup] ChromaDB collection is empty. Starting knowledge base auto-ingestion...")
        kb_dir = settings.knowledge_base_path
        if os.path.exists(kb_dir):
            loader = DocumentLoader()
            chunker = DocumentChunker()
            docs = loader.load_directory(kb_dir)
            total_chunks = []
            for doc in docs:
                total_chunks.extend(chunker.chunk_document(doc))
            if total_chunks:
                added = retriever.add_chunks(total_chunks)
                print(f"[Startup] Ingested {len(docs)} documents into {added} chunks successfully!")

@app.get("/")
def root():
    return {
        "app": "Nexyro IT AI Assistant RAG API",
        "status": "running",
        "docs": "/docs",
        "health": "/api/health"
    }

if __name__ == "__main__":
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
