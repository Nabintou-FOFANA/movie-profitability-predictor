import React, { useState } from 'react';
import { Film, ChevronRight, BarChart3, Clock } from 'lucide-react';
import chaptersData from '../../data/chaptersData.json';
import ChartCard from './ChartCard';

const AnalysisPage = () => {
  const [activeChapter, setActiveChapter] = useState(null);

  // Si aucun chapitre sélectionné, afficher la vue d'ensemble
  if (!activeChapter) {
    return <ChapterOverview setActiveChapter={setActiveChapter} />;
  }

  // Sinon, afficher le chapitre sélectionné
  const chapter = chaptersData.chapters.find(ch => ch.id === activeChapter);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
        <button
          onClick={() => setActiveChapter(null)}
          className="hover:text-white transition-colors"
        >
          Analyse
        </button>
        <ChevronRight className="w-4 h-4" />
        <span className="text-white">{chapter.title}</span>
      </div>

      {/* Chapter Header */}
      <div className="mb-12">
        <div className={`inline-block bg-gradient-to-r ${chapter.color} bg-opacity-10 border border-opacity-20 rounded-lg px-4 py-2 mb-4`}>
          <span className="font-semibold text-sm">{chapter.icon} Chapitre {chapter.number}</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-3">{chapter.title}</h1>
        <p className="text-xl text-gray-400 mb-4">{chapter.subtitle}</p>
        <div className={`h-1 w-32 bg-gradient-to-r ${chapter.color} rounded`}></div>
      </div>

      {/* Description */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 mb-12">
        <p className="text-gray-300 leading-relaxed">{chapter.description}</p>
      </div>

      {/* Visualizations */}
      <div className="space-y-8">
        {chapter.visualizations.map((viz) => (
          <ChartCard key={viz.id} chart={viz} />
        ))}
      </div>

      {/* Summary */}
      <div className={`mt-12 bg-gradient-to-r ${chapter.color} bg-opacity-10 border border-opacity-20 rounded-xl p-8`}>
        <h3 className="text-xl font-bold text-white mb-3 flex items-center">
          <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
          Synthèse du chapitre
        </h3>
        <p className="text-gray-300 leading-relaxed">{chapter.summary}</p>
      </div>

      {/* Navigation */}
      <div className="mt-12 flex justify-between items-center">
        <button
          onClick={() => setActiveChapter(null)}
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all"
        >
          ← Retour aux chapitres
        </button>

        {chapter.number !== '05' && (
          <button
            onClick={() => {
              const nextChapterNum = String(Number(chapter.number) + 1).padStart(2, '0');
              const nextChapter = chaptersData.chapters.find(ch => ch.number === nextChapterNum);
              if (nextChapter) setActiveChapter(nextChapter.id);
            }}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all flex items-center space-x-2"
          >
            <span>Chapitre suivant</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// ============================================
// CHAPTER OVERVIEW COMPONENT
// ============================================
const ChapterOverview = ({ setActiveChapter }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-block bg-blue-600/10 border border-blue-600/20 rounded-lg px-4 py-2 mb-6">
          <span className="text-blue-400 font-semibold">📊 Analyse Cinématographique</span>
        </div>
        <h1 className="text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Analyse Complète
          </span>
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
          Explorez 5 chapitres d'analyse approfondie avec 23 visualisations (statiques + interactives) 
          couvrant 7,632 films de 1980 à 2023
        </p>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        <StatCard icon={<Film className="w-6 h-6" />} value="7,632" label="Films analysés" color="text-blue-500" />
        <StatCard icon={<BarChart3 className="w-6 h-6" />} value="64.7%" label="Taux rentabilité" color="text-green-500" />
        <StatCard icon={<Clock className="w-6 h-6" />} value="1980-2023" label="Période" color="text-purple-500" />
        <StatCard icon="🌍" value="80" label="Pays" color="text-cyan-500" />
      </div>

      {/* Chapters Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chaptersData.chapters.map((chapter, index) => (
          <ChapterCard
            key={chapter.id}
            chapter={chapter}
            index={index}
            setActiveChapter={setActiveChapter}
          />
        ))}
      </div>

      {/* Info Box */}
      <div className="mt-16 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/20 rounded-xl p-8">
        <h3 className="text-xl font-bold mb-3 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-blue-400" />
          À propos de l'analyse
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300">
          <div>
            <p className="mb-2">
              <strong className="text-white">20 graphiques statiques</strong> créés avec Matplotlib/Seaborn
            </p>
            <p>Visualisations PNG haute résolution pour une exploration détaillée des tendances</p>
          </div>
          <div>
            <p className="mb-2">
              <strong className="text-white">3 graphiques interactifs</strong> créés avec Plotly
            </p>
            <p>Dashboards dynamiques avec zoom, filtrage et exploration en temps réel</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// HELPER COMPONENTS
// ============================================
const StatCard = ({ icon, value, label, color }) => (
  <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 text-center hover:border-gray-600 transition-all">
    <div className={`${color} mx-auto mb-3 flex justify-center`}>
      {typeof icon === 'string' ? <span className="text-3xl">{icon}</span> : icon}
    </div>
    <div className="text-3xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-gray-400">{label}</div>
  </div>
);

const ChapterCard = ({ chapter, index, setActiveChapter }) => (
  <div
    onClick={() => setActiveChapter(chapter.id)}
    className="group bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all cursor-pointer relative overflow-hidden"
  >
    {/* Number Badge */}
    <div className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r ${chapter.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity`}></div>
    
    <div className="relative">
      {/* Icon */}
      <div className="text-4xl mb-4">{chapter.icon}</div>

      {/* Chapter Number */}
      <div className="text-sm text-gray-500 mb-2">Chapitre {chapter.number}</div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
        {chapter.title}
      </h3>

      {/* Subtitle */}
      <p className="text-sm text-gray-400 mb-4">{chapter.subtitle}</p>

      {/* Viz Count */}
      <div className="flex items-center space-x-4 text-xs text-gray-500">
        <span>{chapter.visualizations.length} visualisations</span>
        <span>•</span>
        <span>{chapter.visualizations.filter(v => v.type === 'interactive').length} interactives</span>
      </div>

      {/* Arrow */}
      <ChevronRight className="absolute bottom-6 right-6 w-5 h-5 text-gray-600 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
    </div>
  </div>
);

export default AnalysisPage;
