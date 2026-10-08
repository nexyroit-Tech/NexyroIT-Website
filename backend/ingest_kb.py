import os
from app.config import settings
from app.documents.loader import DocumentLoader
from app.documents.chunker import DocumentChunker
from app.rag.retriever import ChromaRetriever

def run_ingestion():
    print(f"Starting Knowledge Base Ingestion...")
    kb_dir = os.path.abspath(settings.KNOWLEDGE_BASE_DIR)
    
    if not os.path.exists(kb_dir):
        print(f"Error: Knowledge base directory {kb_dir} does not exist.")
        return

    loader = DocumentLoader()
    chunker = DocumentChunker()
    retriever = ChromaRetriever()
    
    # 1. Load documents
    docs = loader.load_directory(kb_dir)
    print(f"Found {len(docs)} documents in {kb_dir}")
    
    if not docs:
        print("No readable documents found to ingest.")
        return

    # 2. Chunking
    total_chunks = []
    for doc in docs:
        chunks = chunker.chunk_document(doc)
        print(f" - {doc['metadata']['source']}: generated {len(chunks)} chunks")
        total_chunks.extend(chunks)

    # 3. Store into ChromaDB
    print(f"Generating embeddings and adding {len(total_chunks)} chunks to vector database...")
    retriever.reset() # Reset before bulk ingest
    added = retriever.add_chunks(total_chunks)
    
    print(f"Successfully ingested {added} chunks into ChromaDB at {settings.CHROMA_PATH}")
    print("Ingestion complete.")

if __name__ == "__main__":
    run_ingestion()
