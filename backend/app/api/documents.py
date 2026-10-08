import os
import shutil
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models.schemas import IngestResponse
from app.documents.loader import DocumentLoader
from app.documents.chunker import DocumentChunker
from app.rag.retriever import ChromaRetriever
from app.config import settings

router = APIRouter(prefix="/api/documents", tags=["Documents"])
loader = DocumentLoader()
chunker = DocumentChunker()
retriever = ChromaRetriever()

@router.post("/ingest", response_model=IngestResponse)
async def ingest_knowledge_base():
    """Ingests all files from the knowledge_base directory into ChromaDB."""
    try:
        kb_dir = os.path.abspath(settings.KNOWLEDGE_BASE_DIR)
        if not os.path.exists(kb_dir):
            os.makedirs(kb_dir, exist_ok=True)
            return IngestResponse(
                status="warning",
                documents_ingested=0,
                chunks_created=0,
                message=f"Knowledge base directory created at {kb_dir}, but contained no documents."
            )

        docs = loader.load_directory(kb_dir)
        total_chunks = []
        for doc in docs:
            chunks = chunker.chunk_document(doc)
            total_chunks.extend(chunks)

        if total_chunks:
            retriever.reset()
            added_count = retriever.add_chunks(total_chunks)
            return IngestResponse(
                status="success",
                documents_ingested=len(docs),
                chunks_created=added_count,
                message=f"Successfully ingested {len(docs)} documents into ChromaDB ({added_count} chunks)."
            )
        else:
            return IngestResponse(
                status="warning",
                documents_ingested=len(docs),
                chunks_created=0,
                message="No text chunks generated from knowledge base documents."
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ingestion failed: {str(e)}")

@router.post("/upload", response_model=IngestResponse)
async def upload_document(file: UploadFile = File(...)):
    """Uploads a new document (.txt, .md, .pdf, .json) and immediately ingests it."""
    if not file.filename.endswith((".txt", ".md", ".pdf", ".json")):
        raise HTTPException(status_code=400, detail="Invalid file type. Supported: .txt, .md, .pdf, .json")

    try:
        kb_dir = os.path.abspath(settings.KNOWLEDGE_BASE_DIR)
        os.makedirs(kb_dir, exist_ok=True)
        file_path = os.path.join(kb_dir, file.filename)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Load and chunk single document
        doc = loader.load_file(file_path)
        chunks = chunker.chunk_document(doc)

        if chunks:
            added_count = retriever.add_chunks(chunks)
            return IngestResponse(
                status="success",
                documents_ingested=1,
                chunks_created=added_count,
                message=f"Document '{file.filename}' uploaded and ingested successfully ({added_count} chunks)."
            )
        else:
            return IngestResponse(
                status="warning",
                documents_ingested=1,
                chunks_created=0,
                message=f"File uploaded to {file_path}, but no readable text was extracted."
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File upload error: {str(e)}")
