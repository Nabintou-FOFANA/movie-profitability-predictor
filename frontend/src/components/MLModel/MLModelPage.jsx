import React, { useState } from 'react';
import { Brain, Sparkles, TrendingUp, Loader2, CheckCircle, XCircle, Film } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const GENRES_LIST = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary',
  'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music',
  'Mystery', 'Romance', 'Science Fiction', 'TV Movie', 'Thriller',
  'War', 'Western'
];

const LANGUAGES = [
  { value: 'en', label: 'Anglais' },
  { value: 'fr', label: 'Français' },
  { value: 'es', label: 'Espagnol' },
  { value: 'de', label: 'Allemand' },
  { value: 'it', label: 'Italien' },
  { value: 'ja', label: 'Japonais' },
  { value: 'ko', label: 'Coréen' },
  { value: 'zh', label: 'Chinois' },
  { value: 'hi', label: 'Hindi' },
  { value: 'pt', label: 'Portugais' },
  { value: 'ru', label: 'Russe' },
  { value: 'ar', label: 'Arabe' },
];

const MLModelPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    keywords: '',
    overview: '',
    genres: [],
    adult: false,
    budget: '',
    runtime: '',
    release_year: new Date().getFullYear(),
    original_language: 'en',
    production_countries: '',
    production_companies: '',
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleGenreToggle = (genre) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        ...formData,
        budget: parseFloat(formData.budget) || 0,
        runtime: parseFloat(formData.runtime) || 0,
        release_year: parseInt(formData.release_year) || new Date().getFullYear(),
      };

      const response = await axios.post(`${API_URL}/predict`, payload);
      setResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        "Erreur de connexion au serveur. Vérifiez que le backend est lancé."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      keywords: '',
      overview: '',
      genres: [],
      adult: false,
      budget: '',
      runtime: '',
      release_year: new Date().getFullYear(),
      original_language: 'en',
      production_countries: '',
      production_companies: '',
    });
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
          <Brain className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Prédiction de Rentabilité
          </span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Entrez les caractéristiques d'un film pour prédire s'il sera un
          <span className="text-green-400 font-semibold"> Succès</span> ou un
          <span className="text-red-400 font-semibold"> Échec</span> commercial
        </p>
        <div className="inline-block bg-purple-600/10 border border-purple-600/30 rounded-lg px-4 py-2 mt-4">
          <span className="text-purple-400 text-sm">Modèle XGBoost — Accuracy : 67.79%</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Formulaire */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informations générales */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                <Film className="w-5 h-5 mr-2 text-purple-500" />
                Informations générales
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Titre du film</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Ex: The Dark Knight"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Langue originale</label>
                  <select
                    name="original_language"
                    value={formData.original_language}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                  >
                    {LANGUAGES.map(lang => (
                      <option key={lang.value} value={lang.value}>{lang.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Synopsis / Overview</label>
                <textarea
                  name="overview"
                  value={formData.overview}
                  onChange={handleChange}
                  placeholder="Décrivez brièvement l'histoire du film..."
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all resize-none"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-1">Mots-clés</label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleChange}
                  placeholder="Ex: superhero, crime, dark, action"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Données financières et techniques */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-pink-500" />
                Données financières et techniques
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Budget ($)</label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="Ex: 150000000"
                    min="0"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Durée (minutes)</label>
                  <input
                    type="number"
                    name="runtime"
                    value={formData.runtime}
                    onChange={handleChange}
                    placeholder="Ex: 120"
                    min="0"
                    max="600"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Année de sortie</label>
                  <input
                    type="number"
                    name="release_year"
                    value={formData.release_year}
                    onChange={handleChange}
                    min="1900"
                    max="2030"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center">
                <input
                  type="checkbox"
                  name="adult"
                  checked={formData.adult}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-purple-600 focus:ring-purple-500"
                />
                <label className="ml-2 text-sm text-gray-300">Film pour adultes</label>
              </div>
            </div>

            {/* Genres */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-cyan-500" />
                Genres (sélectionnez un ou plusieurs)
              </h2>
              <div className="flex flex-wrap gap-2">
                {GENRES_LIST.map(genre => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => handleGenreToggle(genre)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      formData.genres.includes(genre)
                        ? 'bg-purple-600 text-white border border-purple-500'
                        : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-gray-600 hover:text-gray-300'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
              {formData.genres.length > 0 && (
                <p className="text-xs text-purple-400 mt-2">
                  {formData.genres.length} genre(s) sélectionné(s) : {formData.genres.join(', ')}
                </p>
              )}
            </div>

            {/* Production */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <h2 className="text-lg font-bold text-white mb-4">Production</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Pays de production</label>
                  <input
                    type="text"
                    name="production_countries"
                    value={formData.production_countries}
                    onChange={handleChange}
                    placeholder="Ex: United States of America"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Studio de production</label>
                  <input
                    type="text"
                    name="production_companies"
                    value={formData.production_companies}
                    onChange={handleChange}
                    placeholder="Ex: Warner Bros. Pictures"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyse en cours...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5 mr-2" />
                    Prédire la rentabilité
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-xl transition-all border border-gray-700"
              >
                Réinitialiser
              </button>
            </div>
          </form>
        </div>

        {/* Panel de résultat */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            {/* Résultat */}
            {result && (
              <div className={`border rounded-xl p-6 mb-6 ${
                result.prediction_code === 1
                  ? 'bg-green-900/20 border-green-600/30'
                  : 'bg-red-900/20 border-red-600/30'
              }`}>
                <div className="text-center">
                  {result.prediction_code === 1 ? (
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  ) : (
                    <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                  )}
                  <h3 className="text-2xl font-bold mb-2">
                    {result.prediction === 'Succès' ? (
                      <span className="text-green-400">Succès probable</span>
                    ) : (
                      <span className="text-red-400">Échec probable</span>
                    )}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6">Confiance : {result.confidence}</p>

                  {/* Jauge de probabilité */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-red-400">Échec</span>
                        <span className="text-red-400 font-bold">{result.probability_echec}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-red-600 to-red-400 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${result.probability_echec}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-green-400">Succès</span>
                        <span className="text-green-400 font-bold">{result.probability_succes}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-green-600 to-green-400 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${result.probability_succes}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Erreur */}
            {error && (
              <div className="bg-red-900/20 border border-red-600/30 rounded-xl p-6 mb-6">
                <XCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <p className="text-red-400 text-center text-sm">{error}</p>
              </div>
            )}

            {/* Info si pas de résultat */}
            {!result && !error && (
              <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <Brain className="w-12 h-12 text-purple-500/50 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-center text-gray-400 mb-2">En attente</h3>
                <p className="text-sm text-gray-500 text-center">
                  Remplissez le formulaire et cliquez sur "Prédire" pour obtenir une estimation
                </p>
              </div>
            )}

            {/* Infos sur le modèle */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mt-6">
              <h3 className="font-bold text-white mb-3">A propos du modèle</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Algorithme</span>
                  <span className="text-white">XGBoost</span>
                </div>
                <div className="flex justify-between">
                  <span>Type</span>
                  <span className="text-white">Classification binaire</span>
                </div>
                <div className="flex justify-between">
                  <span>Accuracy</span>
                  <span className="text-white">67.79%</span>
                </div>
                <div className="flex justify-between">
                  <span>F1-Score</span>
                  <span className="text-white">0.6485</span>
                </div>
                <div className="flex justify-between">
                  <span>Features</span>
                  <span className="text-white">325</span>
                </div>
                <div className="flex justify-between">
                  <span>Entraîné sur</span>
                  <span className="text-white">~16 000 films</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLModelPage;
