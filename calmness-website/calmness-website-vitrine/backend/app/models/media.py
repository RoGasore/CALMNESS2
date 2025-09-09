from sqlalchemy import Column, Integer, String, DateTime, Text, JSON
from sqlalchemy.sql import func
from app.database import Base


class Media(Base):
    __tablename__ = "media"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    alternative_text = Column(String(255), nullable=True)
    caption = Column(Text, nullable=True)
    width = Column(Integer, nullable=True)
    height = Column(Integer, nullable=True)
    formats = Column(JSON, nullable=True)  # For different image sizes
    hash = Column(String(255), nullable=False)
    ext = Column(String(10), nullable=False)
    mime = Column(String(100), nullable=False)
    size = Column(Integer, nullable=False)
    url = Column(String(500), nullable=False)
    preview_url = Column(String(500), nullable=True)
    provider = Column(String(100), default="local")
    provider_metadata = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
