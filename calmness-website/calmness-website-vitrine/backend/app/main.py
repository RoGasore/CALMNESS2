from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .routers import billing
import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv
from pydantic import BaseModel
from typing import List, Optional
import json
from app.database import engine
from app.models.orm import Base as OrmBase
from app.core.scheduler import scheduler_loop
import asyncio

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Calmness FI Backend",
    description="Backend API pour la gestion du contenu du site Calmness FI",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:1337"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for uploads
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Static files for admin
app.mount("/admin", StaticFiles(directory="admin", html=True), name="admin")

# Database connection
def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=os.getenv("DB_HOST", "localhost"),
            database=os.getenv("DB_NAME", "calmness_db"),
            user=os.getenv("DB_USER", "postgres"),
            password=os.getenv("DB_PASSWORD", "password"),
            port=os.getenv("DB_PORT", "5432")
        )
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

# Pydantic models
class PageContent(BaseModel):
    id: Optional[int] = None
    page: str
    section: str
    content: str
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

class Service(BaseModel):
    id: Optional[int] = None
    title: str
    description: str
    icon: str
    link: str
    order: int = 0
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

class FAQ(BaseModel):
    id: Optional[int] = None
    question: str
    answer: str
    order: int = 0
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

# Database initialization
def init_database():
    conn = get_db_connection()
    if not conn:
        return False
    
    try:
        cursor = conn.cursor()
        
        # Create pages_content table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS pages_content (
                id SERIAL PRIMARY KEY,
                page VARCHAR(50) NOT NULL,
                section VARCHAR(100) NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Create services table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS services (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                icon VARCHAR(100) NOT NULL,
                link VARCHAR(255) NOT NULL,
                "order" INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Create faq table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS faq (
                id SERIAL PRIMARY KEY,
                question TEXT NOT NULL,
                answer TEXT NOT NULL,
                "order" INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        conn.commit()
        cursor.close()
        conn.close()
        return True
    except Exception as e:
        print(f"Database initialization error: {e}")
        return False

# Initialize database on startup
init_database()

# Create SQLAlchemy tables if not exist (SQLModel style bootstrap)
@app.on_event("startup")
async def on_startup():
    try:
        async with engine.begin() as conn:
            await conn.run_sync(OrmBase.metadata.create_all)
    except Exception as e:
        print(f"ORM metadata create_all error: {e}")
    # Démarrer le scheduler en tâche de fond
    asyncio.create_task(scheduler_loop())

# API Routes
app.include_router(billing.router)

@app.get("/")
async def root():
    return {"message": "Calmness FI Backend API"}

@app.get("/api/pages/{page}")
async def get_page_content(page: str):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    try:
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute(
            "SELECT * FROM pages_content WHERE page = %s ORDER BY section",
            (page,)
        )
        results = cursor.fetchall()
        cursor.close()
        conn.close()
        
        # Convert to dict format
        content = {}
        for row in results:
            content[row['section']] = row['content']
        
        return {"data": content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/pages/{page}")
async def update_page_content(page: str, content: dict):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    try:
        cursor = conn.cursor()
        
        for section, text in content.items():
            # Check if section exists
            cursor.execute(
                "SELECT id FROM pages_content WHERE page = %s AND section = %s",
                (page, section)
            )
            existing = cursor.fetchone()
            
            if existing:
                # Update existing
                cursor.execute(
                    "UPDATE pages_content SET content = %s, updated_at = CURRENT_TIMESTAMP WHERE page = %s AND section = %s",
                    (text, page, section)
                )
            else:
                # Insert new
                cursor.execute(
                    "INSERT INTO pages_content (page, section, content) VALUES (%s, %s, %s)",
                    (page, section, text)
                )
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return {"message": "Content updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/services")
async def get_services():
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    try:
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("SELECT * FROM services ORDER BY \"order\"")
        results = cursor.fetchall()
        cursor.close()
        conn.close()
        
        return {"data": [dict(row) for row in results]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/services")
async def create_service(service: Service):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    try:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO services (title, description, icon, link, \"order\") VALUES (%s, %s, %s, %s, %s) RETURNING id",
            (service.title, service.description, service.icon, service.link, service.order)
        )
        service_id = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()
        
        return {"id": service_id, "message": "Service created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/services/{service_id}")
async def update_service(service_id: int, service: Service):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    try:
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE services SET title = %s, description = %s, icon = %s, link = %s, \"order\" = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s",
            (service.title, service.description, service.icon, service.link, service.order, service_id)
        )
        conn.commit()
        cursor.close()
        conn.close()
        
        return {"message": "Service updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/services/{service_id}")
async def delete_service(service_id: int):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    try:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM services WHERE id = %s", (service_id,))
        conn.commit()
        cursor.close()
        conn.close()
        
        return {"message": "Service deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/faq")
async def get_faq():
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    try:
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("SELECT * FROM faq ORDER BY \"order\"")
        results = cursor.fetchall()
        cursor.close()
        conn.close()
        
        return {"data": [dict(row) for row in results]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/faq")
async def create_faq(faq: FAQ):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    try:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO faq (question, answer, \"order\") VALUES (%s, %s, %s) RETURNING id",
            (faq.question, faq.answer, faq.order)
        )
        faq_id = cursor.fetchone()[0]
        conn.commit()
        cursor.close()
        conn.close()
        
        return {"id": faq_id, "message": "FAQ created successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/faq/{faq_id}")
async def update_faq(faq_id: int, faq: FAQ):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    try:
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE faq SET question = %s, answer = %s, \"order\" = %s, updated_at = CURRENT_TIMESTAMP WHERE id = %s",
            (faq.question, faq.answer, faq.order, faq_id)
        )
        conn.commit()
        cursor.close()
        conn.close()
        
        return {"message": "FAQ updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/faq/{faq_id}")
async def delete_faq(faq_id: int):
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    try:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM faq WHERE id = %s", (faq_id,))
        conn.commit()
        cursor.close()
        conn.close()
        
        return {"message": "FAQ deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
