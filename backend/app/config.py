import os
from typing import List, Union
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=os.path.join(BASE_DIR, ".env"),
        env_file_encoding="utf-8",
        extra="ignore"
    )

    PORT: int = 8000
    HOST: str = "0.0.0.0"
    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:3001,http://127.0.0.1:3001,http://localhost:5173,https://nexyroit.com,https://nexyro-it-website.vercel.app,*"

    @property
    def cors_origins_list(self) -> List[str]:
        if not self.CORS_ORIGINS:
            return ["*"]
        if isinstance(self.CORS_ORIGINS, list):
            return self.CORS_ORIGINS
        return [origin.strip() for origin in str(self.CORS_ORIGINS).split(",") if origin.strip()]

    # LLM Settings
    GEMINI_API_KEY: str = ""
    OPENAI_API_KEY: str = ""
    LLM_PROVIDER: str = "gemini"  # "gemini" or "openai"

    # Google Calendar Settings
    GOOGLE_CLIENT_ID: str = ""
    GOOGLE_CLIENT_SECRET: str = ""
    GOOGLE_REFRESH_TOKEN: str = ""
    GOOGLE_SERVICE_ACCOUNT_FILE: str = ""
    GOOGLE_CALENDAR_ID: str = "primary"
    CALENDAR_TIMEZONE: str = "Asia/Karachi"

    # Agency Contacts
    NEXYRO_CONTACT_EMAIL: str = "nexyroit@gmail.com"
    NEXYRO_CONTACT_PHONE: str = "+92 3221793231"

    # Vector Database & Knowledge Base Settings
    CHROMA_PATH: str = "./chroma_db"
    KNOWLEDGE_BASE_DIR: str = "./knowledge_base"

    @property
    def chroma_db_path(self) -> str:
        if os.path.isabs(self.CHROMA_PATH):
            return self.CHROMA_PATH
        return os.path.abspath(os.path.join(BASE_DIR, self.CHROMA_PATH))

    @property
    def knowledge_base_path(self) -> str:
        if os.path.isabs(self.KNOWLEDGE_BASE_DIR):
            return self.KNOWLEDGE_BASE_DIR
        return os.path.abspath(os.path.join(BASE_DIR, self.KNOWLEDGE_BASE_DIR))

settings = Settings()
