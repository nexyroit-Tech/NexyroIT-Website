import os
import json
import math
from typing import List, Dict, Any
from app.config import settings
from app.embeddings.gemini_embeddings import EmbeddingGenerator

class ChromaRetriever:
    """
    ChromaDB-compatible vector retriever.
    Uses chromadb.PersistentClient when available.
    Falls back to a lightweight JSON-based in-process vector store
    when chromadb is not installed or incompatible (e.g. Python 3.14).
    """

    def __init__(self, collection_name: str = "nexyro_knowledge"):
        self.collection_name = collection_name
        self.chroma_path = settings.chroma_db_path
        self.embedding_gen = EmbeddingGenerator()
        self.client = None
        self.collection = None

        # JSON fallback store path
        self.json_store_path = os.path.join(self.chroma_path, "nexyro_store.json")

        # Try importing and using ChromaDB
        try:
            import chromadb
            os.makedirs(self.chroma_path, exist_ok=True)
            self.client = chromadb.PersistentClient(path=self.chroma_path)
            self.collection = self.client.get_or_create_collection(
                name=collection_name,
                metadata={"hnsw:space": "cosine"}
            )
            self._use_chroma = True
            print("[Retriever] Using ChromaDB PersistentClient")
        except Exception as e:
            self._use_chroma = False
            print(f"[Retriever] ChromaDB unavailable ({e}). Using JSON vector fallback.")
            os.makedirs(self.chroma_path, exist_ok=True)
            self._load_json_store()

    # ── JSON fallback store ────────────────────────────────────────

    def _load_json_store(self):
        if os.path.exists(self.json_store_path):
            with open(self.json_store_path, "r", encoding="utf-8") as f:
                self._store = json.load(f)
        else:
            self._store = {"documents": [], "embeddings": [], "metadatas": []}

    def _save_json_store(self):
        with open(self.json_store_path, "w", encoding="utf-8") as f:
            json.dump(self._store, f, ensure_ascii=False)

    def _cosine_similarity(self, a: List[float], b: List[float]) -> float:
        dot = sum(x * y for x, y in zip(a, b))
        norm_a = math.sqrt(sum(x * x for x in a)) or 1.0
        norm_b = math.sqrt(sum(x * x for x in b)) or 1.0
        return dot / (norm_a * norm_b)

    # ── Public API ────────────────────────────────────────────────

    def add_chunks(self, chunks: List[Dict[str, Any]]) -> int:
        if not chunks:
            return 0

        documents = [c["text"] for c in chunks]
        metadatas = [c["metadata"] for c in chunks]
        embeddings = self.embedding_gen.embed_documents(documents)

        if self._use_chroma and self.collection:
            ids = [f"chunk_{i}_{abs(hash(c['text']))}" for i, c in enumerate(chunks)]
            # Batch in groups of 100 to avoid memory issues
            batch_size = 100
            for i in range(0, len(chunks), batch_size):
                self.collection.add(
                    documents=documents[i:i+batch_size],
                    embeddings=embeddings[i:i+batch_size],
                    metadatas=metadatas[i:i+batch_size],
                    ids=ids[i:i+batch_size]
                )
        else:
            self._load_json_store()
            self._store["documents"].extend(documents)
            self._store["embeddings"].extend(embeddings)
            self._store["metadatas"].extend(metadatas)
            self._save_json_store()

        return len(chunks)

    def search_similar(self, query: str, top_k: int = 4) -> List[Dict[str, Any]]:
        if self._use_chroma and self.collection:
            count = self.collection.count()
            if count == 0:
                return []
            query_emb = self.embedding_gen.embed_query(query)
            results = self.collection.query(
                query_embeddings=[query_emb],
                n_results=min(top_k, count),
                include=["documents", "metadatas", "distances"]
            )
            retrieved = []
            if results and results.get("documents") and results["documents"][0]:
                docs = results["documents"][0]
                metas = results["metadatas"][0] if results.get("metadatas") else [{}] * len(docs)
                distances = results["distances"][0] if results.get("distances") else [0.0] * len(docs)
                for doc, meta, dist in zip(docs, metas, distances):
                    retrieved.append({
                        "content": doc,
                        "metadata": meta,
                        "distance": dist,
                        "source": meta.get("source", "Nexyro IT Website"),
                        "title": meta.get("section_title", "General Information")
                    })
            return retrieved
        else:
            self._load_json_store()
            # JSON fallback: compute cosine similarity manually
            if not self._store["documents"]:
                return []
            query_emb = self.embedding_gen.embed_query(query)
            scored = []
            for doc, emb, meta in zip(
                self._store["documents"],
                self._store["embeddings"],
                self._store["metadatas"]
            ):
                sim = self._cosine_similarity(query_emb, emb)
                scored.append((sim, doc, meta))
            scored.sort(key=lambda x: x[0], reverse=True)
            return [
                {
                    "content": doc,
                    "metadata": meta,
                    "distance": 1 - sim,
                    "source": meta.get("source", "Nexyro IT Website"),
                    "title": meta.get("section_title", "General Information")
                }
                for sim, doc, meta in scored[:top_k]
            ]

    def get_count(self) -> int:
        if self._use_chroma and self.collection:
            return self.collection.count()
        self._load_json_store()
        return len(self._store.get("documents", []))

    def reset(self):
        if self._use_chroma and self.client:
            try:
                self.client.delete_collection(self.collection_name)
                self.collection = self.client.get_or_create_collection(
                    name=self.collection_name,
                    metadata={"hnsw:space": "cosine"}
                )
            except Exception as e:
                print(f"Error resetting ChromaDB collection: {e}")
        else:
            self._store = {"documents": [], "embeddings": [], "metadatas": []}
            self._save_json_store()
