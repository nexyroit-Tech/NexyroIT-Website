import os
import glob
from typing import List, Dict, Any
from pypdf import PdfReader

class DocumentLoader:
    """Loads text, markdown, json, and pdf files for RAG processing."""
    
    @staticmethod
    def load_file(file_path: str) -> Dict[str, Any]:
        file_name = os.path.basename(file_path)
        ext = os.path.splitext(file_name)[1].lower()
        
        content = ""
        metadata = {
            "source": file_name,
            "path": file_path,
            "type": ext.replace(".", "")
        }

        try:
            if ext in [".txt", ".md", ".json"]:
                with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
            elif ext == ".pdf":
                reader = PdfReader(file_path)
                text_pages = []
                for i, page in enumerate(reader.pages):
                    text = page.extract_text() or ""
                    text_pages.append(text)
                content = "\n\n".join(text_pages)
                metadata["page_count"] = len(reader.pages)
        except Exception as e:
            print(f"Error reading file {file_path}: {e}")
            
        return {
            "content": content,
            "metadata": metadata
        }

    @classmethod
    def load_directory(cls, dir_path: str) -> List[Dict[str, Any]]:
        documents = []
        if not os.path.exists(dir_path):
            return documents
            
        for root, _, files in os.walk(dir_path):
            for file in files:
                if file.endswith((".txt", ".md", ".json", ".pdf")):
                    full_path = os.path.join(root, file)
                    doc = cls.load_file(full_path)
                    if doc["content"].strip():
                        documents.append(doc)
        return documents
