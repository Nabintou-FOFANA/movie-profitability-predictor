# CinéPredict - Prédiction de Rentabilité des Films

![Status](https://img.shields.io/badge/Status-Terminé-green)
![Python](https://img.shields.io/badge/Python-3.11-blue)
![React](https://img.shields.io/badge/React-19-61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688)
![XGBoost](https://img.shields.io/badge/XGBoost-2.1-orange)

## Démo en ligne

- **Site web** : [https://cinepredict.onrender.com](https://cinepredict.onrender.com)
- **API** : [https://cinepredict-api.onrender.com](https://cinepredict-api.onrender.com)

> *Note : Les services Render gratuits se mettent en veille après 15 minutes d'inactivité. Le premier chargement peut prendre ~30 secondes.*

## Description

Projet de Data Science et Machine Learning analysant les données TMDB pour prédire la rentabilité d'un film au box-office. Le site permet de saisir les caractéristiques d'un film et d'obtenir une prédiction (Succès / Échec) grâce à un modèle XGBoost.

### Objectifs

- **Identifier** les patterns de succès au cinéma
- **Visualiser** les tendances du marché (1980-2023)
- **Prédire** la rentabilité d'un film avec Machine Learning

### Dataset

- **Source** : TMDB (The Movie Database)
- **Volume** : ~16 000 films (après nettoyage)
- **Période** : 1898-2025
- **Variables** : Budget, revenus, genres, synopsis, mots-clés, langue, durée...

### Résultats du modèle

| Métrique | Valeur |
|----------|--------|
| Algorithme | XGBoost (classification binaire) |
| Accuracy | 67.79% |
| F1-Score | 0.6485 |
| Features | 325 (TF-IDF + genres + budget + runtime + ...) |
| Classes | Échec (0) / Succès (1) |

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/Nabintou-FOFANA/movie-profitability-predictor.git
cd movie-profitability-predictor
```

### 2. Backend (API FastAPI)

```bash
# Créer et activer l'environnement virtuel
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

# Installer les dépendances
pip install -r backend/requirements.txt

# Lancer le serveur
cd backend
uvicorn app:app --reload --port 8000
```

API accessible sur http://localhost:8000

### 3. Frontend (React)

```bash
cd frontend
npm install
npm start
```

Site accessible sur http://localhost:3000

### 4. Notebooks Jupyter

```bash
pip install -r requirements.txt
jupyter notebook
```

## Structure du Projet

```
movie-profitability-predictor/
├── backend/               # API FastAPI
│   ├── app.py             # Serveur FastAPI + endpoints
│   ├── predict.py         # Pipeline de prédiction
│   └── requirements.txt   # Dépendances backend
├── frontend/              # Application React + Tailwind
│   ├── src/
│   │   ├── components/
│   │   │   ├── Analysis/       # Page d'analyse des données
│   │   │   └── MLModel/        # Page de prédiction ML
│   │   └── App.js
│   └── package.json
├── models/                # Modèle et transformers sauvegardés
│   ├── model_xgb_2classes.joblib
│   ├── tfidf_vectorizer.joblib
│   ├── standard_scaler.joblib
│   └── genre_encoder.joblib
├── data/
│   ├── raw/               # Données brutes (TMDB)
│   └── processed/         # Données nettoyées + features
├── notebooks/             # Jupyter notebooks (pipeline ML)
│   ├── 01_data_exploration_cleaning.ipynb
│   ├── 04_exploration_nettoyage2.ipynb
│   ├── 05_feature_engineering.ipynb
│   ├── 06_split_pca.ipynb
│   ├── 08_xgboost_v2.ipynb
│   └── 09_comparaison_models.ipynb
├── outputs/               # Graphiques et figures
├── render.yaml            # Configuration déploiement Render
├── requirements.txt       # Dépendances Python (notebooks)
└── README.md
```

## Pipeline ML

```
Données brutes (TMDB)
    ↓
1. Nettoyage (notebook 04)
    → Filtrage budget/revenue > 0
    → Suppression doublons, NaN, outliers
    ↓
2. Feature Engineering (notebook 05)
    → TF-IDF sur texte (300 features)
    → One-hot encoding genres (20 features)
    → StandardScaler budget/runtime
    → Variables binaires (adult, is_english)
    ↓
3. Train/Test Split (notebook 06)
    → 80% train / 20% test (stratifié)
    ↓
4. Entraînement XGBoost (notebook 08)
    → Classification binaire (Échec vs Succès)
    → Accuracy : 67.79%
    ↓
5. Déploiement (backend + frontend)
    → API FastAPI + Interface React
```

## Technologies

| Catégorie | Technologies |
|-----------|-------------|
| **Data Science** | Python, Pandas, NumPy, Matplotlib, Seaborn |
| **Machine Learning** | Scikit-learn, XGBoost |
| **Backend** | FastAPI, Uvicorn |
| **Frontend** | React 19, Tailwind CSS, Axios, Plotly, Recharts |
| **Déploiement** | Render |

## Équipe

- **Hawa DIALLO** - Data Scientist
- **Hiba LOUZZANI** - Data Scientist
- **Nabintou FOFANA** - Data Scientist
- **Oumar MAHAMAT** - Data Scientist

Étudiants en Master 2 MIAGE - Université Paris Nanterre

## Licence

Projet académique - UPN M2 PSID - 2025
