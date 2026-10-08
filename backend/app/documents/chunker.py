import re
from typing import List, Dict, Any

class DocumentChunker:
    """Splits documents into contextual chunks with rich metadata."""

    def __init__(self, chunk_size: int = 500, chunk_overlap: int = 100):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap

    def chunk_document(self, doc: Dict[str, Any]) -> List[Dict[str, Any]]:
        content = doc["content"]
        base_meta = doc["metadata"]
        
        # Clean text
        content = re.sub(r'\r\n', '\n', content)
        
        # Split by sections or paragraphs first
        paragraphs = content.split("\n\n")
        chunks = []
        
        current_chunk = ""
        current_title = base_meta.get("source", "Nexyro IT Knowledge")

        for para in paragraphs:
            para = para.strip()
            if not para:
                continue
                
            # Extract section titles if heading line
            if para.startswith("#"):
                heading = para.lstrip("#").strip()
                current_title = heading

            if len(current_chunk) + len(para) + 2 <= self.chunk_size:
                current_chunk += ("\n\n" if current_chunk else "") + para
            else:
                if current_chunk:
                    chunks.append({
                        "text": current_chunk,
                        "metadata": {
                            **base_meta,
                            "section_title": current_title,
                            "chunk_length": len(current_chunk)
                        }
                    })
                # Overlap logic
                if len(para) > self.chunk_size:
                    # Break huge paragraph into fixed word chunks
                    words = para.split()
                    sub_chunk = []
                    sub_len = 0
                    for word in words:
                        sub_chunk.append(word)
                        sub_len += len(word) + 1
                        if sub_len >= self.chunk_size:
                            chunks.append({
                                "text": " ".join(sub_chunk),
                                "metadata": {
                                    **base_meta,
                                    "section_title": current_title,
                                    "chunk_length": sub_len
                                }
                            })
                            # Keep overlap
                            overlap_count = min(len(sub_chunk), 20)
                            sub_chunk = sub_chunk[-overlap_count:]
                            sub_len = sum(len(w) + 1 for w in sub_chunk)
                    if sub_chunk:
                        current_chunk = " ".join(sub_chunk)
                    else:
                        current_chunk = ""
                else:
                    current_chunk = para

        if current_chunk:
            chunks.append({
                "text": current_chunk,
                "metadata": {
                    **base_meta,
                    "section_title": current_title,
                    "chunk_length": len(current_chunk)
                }
            })

        return chunks
