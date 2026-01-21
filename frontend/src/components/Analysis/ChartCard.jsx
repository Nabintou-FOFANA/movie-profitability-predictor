import React, { useState } from 'react';
import { BarChart3, TrendingUp, ZoomIn } from 'lucide-react';

const ChartCard = ({ chart }) => {
  const [imageError, setImageError] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [isLoading, setIsLoading] = useState(chart.type === 'interactive');

  // Rendu pour graphique STATIQUE (PNG)
  if (chart.type === 'static') {
    return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-all">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                {chart.title}
              </h3>
              <p className="text-sm text-gray-400">{chart.description}</p>
            </div>
            <div className="ml-4">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </div>
          
          {/* Image Container */}
          <div className="bg-gray-950 rounded-lg overflow-hidden mb-4">
            {!imageError ? (
              <img
                src={`/visualizations/static/${chart.file}`}
                alt={chart.title}
                className="w-full h-auto hover:scale-105 transition-transform duration-300"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <BarChart3 className="w-12 h-12 mx-auto mb-3 opacity-30 animate-pulse" />
                  <p className="text-sm font-medium">Graphique à venir</p>
                  <p className="text-xs text-gray-600 mt-1">Sera généré via Jupyter</p>
                </div>
              </div>
            )}
          </div>

          {/* Insights */}
          {chart.insights && chart.insights.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                📊 Insights clés
              </p>
              <div className="space-y-1">
                {chart.insights.map((insight, idx) => (
                  <div key={idx} className="flex items-start text-xs text-gray-500">
                    <span className="text-blue-500 mr-2 mt-0.5">→</span>
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Rendu pour graphique INTERACTIF (HTML Plotly)
  if (chart.type === 'interactive') {
    return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">{chart.title}</h3>
              <p className="text-gray-400">{chart.description}</p>
            </div>
            <div className="ml-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Features Tags */}
          {chart.features && chart.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {chart.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-xs border border-purple-600/30 font-medium flex items-center space-x-1"
                >
                  <ZoomIn className="w-3 h-3" />
                  <span>{feature}</span>
                </span>
              ))}
            </div>
          )}

          {/* Iframe Container */}
          <div className="bg-gray-950 rounded-lg overflow-hidden relative">
            {/* Loading Spinner */}
            {isLoading && !iframeError && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-gray-950 z-10"
                style={{ height: chart.height }}
              >
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-3"></div>
                  <p className="text-sm text-gray-400">Chargement interactif...</p>
                </div>
              </div>
            )}

            {/* Iframe */}
            {!iframeError ? (
              <iframe
                src={`/visualizations/interactive/${chart.file}`}
                width="100%"
                height={chart.height}
                frameBorder="0"
                title={chart.title}
                className="w-full"
                onLoad={() => setIsLoading(false)}
                onError={() => {
                  setIframeError(true);
                  setIsLoading(false);
                }}
              />
            ) : (
              <div
                className="w-full flex items-center justify-center bg-gray-950"
                style={{ height: chart.height }}
              >
                <div className="text-center text-gray-500">
                  <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm font-medium">Graphique interactif à venir</p>
                  <p className="text-xs text-gray-600 mt-2">
                    Fichier <code className="bg-gray-800 px-2 py-1 rounded">{chart.file}</code> sera généré via Jupyter
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Insights */}
          {chart.insights && chart.insights.length > 0 && (
            <div className="mt-6 bg-gradient-to-r from-purple-600/5 to-pink-600/5 border border-purple-600/20 rounded-lg p-4">
              <p className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
                💡 Insights clés
              </p>
              <div className="space-y-1">
                {chart.insights.map((insight, idx) => (
                  <div key={idx} className="flex items-start text-sm text-gray-300">
                    <span className="text-purple-500 mr-2">→</span>
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default ChartCard;
