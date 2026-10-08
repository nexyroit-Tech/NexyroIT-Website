import os
import hashlib
import math
from typing import List
import requests
from app.config import settings

class EmbeddingGenerator:
    """Generates embeddings using Gemini REST API with local deterministic fallback."""
    
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY or os.environ.get("GEMINI_API_KEY", "")
        self.fallback_model = None

    def _get_fallback_model(self):
        if self.fallback_model is None:
            try:
                from sentence_transformers import SentenceTransformer
                self.fallback_model = SentenceTransformer("all-MiniLM-L6-v2")
            except Exception:
                self.fallback_model = False
        return self.fallback_model

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        if not texts:
            return []

        # Attempt Gemini Embeddings REST API if API key present
        if self.api_key:
            try:
                embeddings = []
                url = f"https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key={self.api_key}"
                for text in texts:
                    payload = {
                        "model": "models/text-embedding-004",
                        "content": {"parts": [{"text": text[:2000]}]},
                        "taskType": "RETRIEVAL_DOCUMENT"
                    }
                    res = requests.post(url, json=payload, timeout=15)
                    if res.status_code == 200:
                        data = res.json()
                        vals = data.get("embedding", {}).get("values", [])
                        embeddings.append(vals)
                    else:
                        embeddings.append(self._pseudo_embedding(text))
                if len(embeddings) == len(texts):
                    return embeddings
            except Exception as e:
                print(f"Gemini embedding REST API error: {e}")

        # Local fallback
        fallback = self._get_fallback_model()
        if fallback:
            try:
                return fallback.encode(texts).tolist()
            except Exception:
                pass
            
        # Ultimate fallback: normalized deterministic pseudo-embeddings
        return [self._pseudo_embedding(t) for t in texts]

    def embed_query(self, text: str) -> List[float]:
        if not text:
            return [0.0] * 384

        if self.api_key:
            try:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key={self.api_key}"
                payload = {
                    "model": "models/text-embedding-004",
                    "content": {"parts": [{"text": text[:2000]}]},
                    "taskType": "RETRIEVAL_QUERY"
                }
                res = requests.post(url, json=payload, timeout=15)
                if res.status_code == 200:
                    data = res.json()
                    vals = data.get("embedding", {}).get("values", [])
                    if vals:
                        return vals
            except Exception as e:
                print(f"Gemini query embedding REST API error: {e}")

        fallback = self._get_fallback_model()
        if fallback:
            try:
                return fallback.encode(text).tolist()
            except Exception:
                pass
            
        return self._pseudo_embedding(text)

    def _pseudo_embedding(self, text: str, dim: int = 384) -> List[float]:
        vector = []
        for i in range(dim):
            seed_str = f"{text}_{i}"
            h = hashlib.sha256(seed_str.encode("utf-8")).hexdigest()
            val = (int(h[:8], 16) / 0xFFFFFFFF) * 2 - 1
            vector.append(val)
        norm = math.sqrt(sum(x*x for x in vector)) or 1.0
        return [x / norm for x in vector]
