# download_data.py
import kagglehub
import shutil
import os

print("📥 Téléchargement du dataset TMDB...")

# Télécharger le dataset
path = kagglehub.dataset_download("asaniczka/tmdb-movies-dataset-2023-930k-movies/versions/816")
print(f"✅ Dataset téléchargé dans : {path}")

# Copier dans notre dossier data/raw
destination = "data/raw"
if not os.path.exists(destination):
    os.makedirs(destination)

# Copier tous les fichiers
for file in os.listdir(path):
    src = os.path.join(path, file)
    dst = os.path.join(destination, file)
    if os.path.isfile(src):
        shutil.copy2(src, dst)
        print(f"✅ Copié : {file}")

print(f"\n🎉 Dataset disponible dans : {destination}")