import re
import numpy as np
import joblib
import os

# Chemin vers le dossier models
MODELS_DIR = os.path.join(os.path.dirname(__file__), '..', 'models')

# Chargement du modèle et des transformers (une seule fois au démarrage)
model = joblib.load(os.path.join(MODELS_DIR, 'model_xgb_2classes.joblib'))
tfidf_vectorizer = joblib.load(os.path.join(MODELS_DIR, 'tfidf_vectorizer.joblib'))
standard_scaler = joblib.load(os.path.join(MODELS_DIR, 'standard_scaler.joblib'))
genre_encoder = joblib.load(os.path.join(MODELS_DIR, 'genre_encoder.joblib'))

# Noms des features attendus par le modèle (dans le bon ordre)
feature_names = joblib.load(os.path.join(MODELS_DIR, 'tfidf_vectorizer.joblib')).get_feature_names_out()


def clean_text(text):
    """Nettoyage du texte : minuscules, suppression ponctuation et chiffres.
    Reproduit exactement la fonction du notebook 05."""
    if not isinstance(text, str):
        return ''
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def predict_movie(data: dict) -> dict:
    """
    Pipeline de prédiction complet.
    Reproduit exactement le feature engineering du notebook 05.

    Args:
        data: dictionnaire avec les caractéristiques du film

    Returns:
        dictionnaire avec la prédiction et la probabilité
    """
    # 1. Texte : combiner title + keywords + overview → clean → TF-IDF
    title = data.get('title', '')
    keywords = data.get('keywords', '')
    overview = data.get('overview', '')
    text_combined = clean_text(f"{title} {keywords} {overview}")

    tfidf_features = tfidf_vectorizer.transform([text_combined]).toarray()  # (1, 300)

    # 2. Genres : MultiLabelBinarizer
    genres = data.get('genres', [])
    if isinstance(genres, str):
        genres = [g.strip() for g in genres.split(',')]

    # Utiliser le genre_encoder pour transformer (gère les genres inconnus)
    genres_encoded = genre_encoder.transform([genres])  # (1, 20)

    # 3. Variables numériques : StandardScaler sur budget et runtime
    budget = data.get('budget', 0)
    runtime = data.get('runtime', 0)
    num_features = standard_scaler.transform([[budget, runtime]])  # (1, 2)

    # 4. Variables catégorielles simples
    adult_encoded = int(data.get('adult', False))
    is_english = 1 if data.get('original_language', '') == 'en' else 0
    release_year = data.get('release_year', 2024)

    scalars = np.array([[adult_encoded, is_english, release_year]])  # (1, 3)

    # 5. Assemblage dans le bon ordre (identique au notebook 05)
    # Ordre : tfidf (300) | genres (20) | budget_scaled, runtime_scaled (2) | adult, is_english, release_year (3)
    X = np.hstack([tfidf_features, genres_encoded, num_features, scalars])  # (1, 325)

    # 6. Prédiction
    prediction = model.predict(X)[0]
    probability = model.predict_proba(X)[0]

    # Classe 0 = Échec, Classe 1 = Succès
    prediction_label = "Succès" if prediction == 1 else "Échec"
    confidence = float(probability[int(prediction)])

    return {
        "prediction": prediction_label,
        "prediction_code": int(prediction),
        "probability_echec": round(float(probability[0]) * 100, 1),
        "probability_succes": round(float(probability[1]) * 100, 1),
        "confidence": f"{round(confidence * 100, 1)}%"
    }
