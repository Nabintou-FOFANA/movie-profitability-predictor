import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from predict import predict_movie

app = FastAPI(
    title="CinéPredict API",
    description="API de prédiction de rentabilité de films",
    version="1.0.0"
)

# CORS : autoriser le frontend (localhost en dev, URL Render en prod)
allowed_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

# Ajouter l'URL du frontend Render si définie
frontend_url = os.environ.get("FRONTEND_URL")
if frontend_url:
    allowed_origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class MovieInput(BaseModel):
    title: str = ""
    keywords: str = ""
    overview: str = ""
    genres: list[str] = []
    adult: bool = False
    budget: float = 0
    runtime: float = 0
    release_year: int = 2024
    original_language: str = "en"
    production_countries: str = ""
    production_companies: str = ""


@app.get("/")
def root():
    return {"message": "CinéPredict API - Prédiction de rentabilité de films", "status": "ok"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict")
def predict(movie: MovieInput):
    result = predict_movie(movie.model_dump())
    return result
