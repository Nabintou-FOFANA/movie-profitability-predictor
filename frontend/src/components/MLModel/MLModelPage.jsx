import React from 'react';
import { Brain, Sparkles, TrendingUp } from 'lucide-react';

const MLModelPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center">
          <Brain className="w-12 h-12 text-white" />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Modèle de Machine Learning
          </span>
        </h1>

        {/* Description */}
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
          Prédisez la rentabilité d'un film en fonction de ses caractéristiques 
          grâce à notre modèle entraîné sur 7,632 films
        </p>

        {/* Status Badge */}
        <div className="inline-block bg-purple-600/10 border border-purple-600/30 rounded-lg px-6 py-3 mb-12">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
            <span className="text-amber-400 font-semibold">🚧 En développement</span>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <Sparkles className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-bold text-white mb-2">Prédiction instantanée</h3>
            <p className="text-sm text-gray-400">
              Obtenez une estimation de ROI en quelques secondes
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <TrendingUp className="w-8 h-8 text-pink-500 mx-auto mb-3" />
            <h3 className="font-bold text-white mb-2">Analyse détaillée</h3>
            <p className="text-sm text-gray-400">
              Comprenez les facteurs qui influencent la prédiction
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <Brain className="w-8 h-8 text-cyan-500 mx-auto mb-3" />
            <h3 className="font-bold text-white mb-2">Modèle avancé</h3>
            <p className="text-sm text-gray-400">
              XGBoost entraîné sur données historiques 1980-2023
            </p>
          </div>
        </div>

        {/* Coming Soon Info */}
        <div className="mt-12 bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-600/20 rounded-xl p-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold mb-4">🔮 Prochainement disponible</h3>
          <div className="text-left text-gray-300 space-y-3 text-sm">
            <div className="flex items-start">
              <span className="text-purple-500 mr-2">✓</span>
              <span>Interface de saisie pour entrer les caractéristiques d'un film (budget, genre, date de sortie, etc.)</span>
            </div>
            <div className="flex items-start">
              <span className="text-purple-500 mr-2">✓</span>
              <span>Prédiction du ROI et de la rentabilité avec intervalle de confiance</span>
            </div>
            <div className="flex items-start">
              <span className="text-purple-500 mr-2">✓</span>
              <span>Analyse d'importance des features pour comprendre l'impact de chaque variable</span>
            </div>
            <div className="flex items-start">
              <span className="text-purple-500 mr-2">✓</span>
              <span>Comparaison avec des films similaires dans le dataset</span>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Cette fonctionnalité sera ajoutée après l'entraînement et l'évaluation du modèle ML
          </p>
        </div>
      </div>
    </div>
  );
};

export default MLModelPage;
