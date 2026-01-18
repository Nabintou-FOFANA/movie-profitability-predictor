import React, { useState } from 'react';
import { Film, TrendingUp, Brain, BarChart3, Github, Menu, X } from 'lucide-react';

// ============================================
// NAVBAR COMPONENT
// ============================================
const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: Film },
    { id: 'dataviz', label: 'Data Viz', icon: BarChart3 },
    { id: 'model', label: 'Modèle ML', icon: Brain, disabled: true }
  ];

  return (
    <nav className="bg-gray-900 bg-opacity-95 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="bg-gradient-to-r from-red-600 to-red-800 p-2 rounded-lg">
              <Film className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
              CinéPredict
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => !item.disabled && setCurrentPage(item.id)}
                  disabled={item.disabled}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-red-600 text-white'
                      : item.disabled
                      ? 'text-gray-500 cursor-not-allowed'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.disabled && (
                    <span className="text-xs bg-gray-700 px-2 py-0.5 rounded">Bientôt</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* GitHub Link */}
          <a
            href="https://github.com/votre-username/movie-profitability-predictor"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (!item.disabled) {
                      setCurrentPage(item.id);
                      setIsMenuOpen(false);
                    }
                  }}
                  disabled={item.disabled}
                  className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition-all ${
                    currentPage === item.id
                      ? 'bg-red-600 text-white'
                      : item.disabled
                      ? 'text-gray-500'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.disabled && (
                    <span className="text-xs bg-gray-700 px-2 py-0.5 rounded ml-auto">Bientôt</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

// ============================================
// HOME PAGE
// ============================================
const HomePage = ({ setCurrentPage }) => {
  const datasetFeatures = [
    { label: 'Films totaux', value: '930 000+', icon: Film },
    { label: 'Période', value: '1980-2023', icon: TrendingUp },
    { label: 'Genres', value: '20+', icon: BarChart3 },
    { label: 'Variables', value: '25+', icon: Brain }
  ];

  const dataColumns = [
    { name: 'Informations générales', items: ['Titre', 'Date de sortie', 'Durée', 'Langue originale', 'Statut'] },
    { name: 'Données financières', items: ['Budget', 'Revenus', 'ROI calculé', 'Profit/Perte'] },
    { name: 'Métadonnées', items: ['Genres', 'Studios de production', 'Pays de production'] },
    { name: 'Popularité', items: ['Note moyenne', 'Nombre de votes', 'Score de popularité'] }
  ];

  const solutionSteps = [
    {
      number: '01',
      title: 'Exploration & Nettoyage',
      description: 'Analyse exploratoire approfondie, traitement des valeurs manquantes et aberrantes',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: '02',
      title: 'Visualisation Interactive',
      description: 'Création de dashboards pour identifier les patterns et tendances du marché',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500'
    },
    {
      number: '03',
      title: 'Modèle Prédictif',
      description: 'Entraînement d\'algorithmes ML pour prédire la rentabilité avec haute précision',
      icon: Brain,
      color: 'from-red-500 to-orange-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-gray-900 to-amber-900/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-red-600/10 border border-red-600/20 rounded-full px-4 py-2 mb-8">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-red-400">Projet Data Science & Machine Learning</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-red-500 via-amber-500 to-red-500 bg-clip-text text-transparent">
                CinéPredict
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Prédisez la rentabilité de vos films grâce à l'Intelligence Artificielle
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setCurrentPage('dataviz')}
                className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/50"
              >
                <span className="flex items-center justify-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Explorer les données</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
              
              <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 border border-gray-700 hover:border-gray-600">
                <span className="flex items-center justify-center space-x-2">
                  <Github className="w-5 h-5" />
                  <span>Voir sur GitHub</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contexte Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Contexte */}
          <div>
            <div className="inline-block bg-red-600/10 border border-red-600/20 rounded-lg px-4 py-2 mb-6">
              <span className="text-red-400 font-semibold">📋 Contexte</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Un marché cinématographique en pleine mutation
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                L'industrie du cinéma représente un marché de <strong className="text-white">plusieurs milliards de dollars</strong>, 
                mais la rentabilité d'un film reste extrêmement difficile à prédire. Avec l'émergence des plateformes de streaming, 
                l'évolution des goûts du public et l'augmentation constante des budgets de production, les studios ont besoin 
                d'outils d'aide à la décision performants.
              </p>
              <p>
                Selon les statistiques du secteur, <strong className="text-white">seulement 40% des films</strong> sont rentables 
                au box-office. Les pertes peuvent atteindre des centaines de millions de dollars pour un seul film, tandis que 
                les blockbusters peuvent générer des revenus dépassant le milliard.
              </p>
              <p>
                Dans ce contexte, comprendre les facteurs qui influencent le succès d'un film devient un <strong className="text-white">enjeu stratégique majeur</strong> pour 
                les producteurs, distributeurs et investisseurs.
              </p>
            </div>
          </div>

          {/* Right Column - Objectif */}
          <div>
            <div className="inline-block bg-amber-600/10 border border-amber-600/20 rounded-lg px-4 py-2 mb-6">
              <span className="text-amber-400 font-semibold">🎯 Objectif</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Notre mission
            </h2>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 mb-6">
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Développer un système d'analyse et de prédiction capable de répondre à la question :
              </p>
              <div className="bg-gradient-to-r from-red-600/20 to-amber-600/20 border border-red-600/30 rounded-xl p-6 text-center">
                <p className="text-xl font-bold text-white">
                  "Ce film sera-t-il rentable au box-office ?"
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Identifier les patterns de succès</h4>
                  <p className="text-gray-400 text-sm">Analyser les caractéristiques communes aux films rentables</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Visualiser les tendances du marché</h4>
                  <p className="text-gray-400 text-sm">Créer des dashboards interactifs pour explorer les données</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Prédire la rentabilité</h4>
                  <p className="text-gray-400 text-sm">Entraîner un modèle ML capable d'estimer le ROI d'un projet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="bg-gradient-to-b from-gray-900 to-gray-800/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-purple-600/10 border border-purple-600/20 rounded-lg px-4 py-2 mb-6">
              <span className="text-purple-400 font-semibold">💡 Notre Solution</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Une approche en trois phases
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Méthodologie rigoureuse combinant data science et machine learning
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {solutionSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Connector line */}
                  {index < solutionSteps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-gray-600 to-transparent z-0"></div>
                  )}
                  
                  <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300 h-full">
                    {/* Number badge */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-red-600 to-amber-600 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg">
                      {step.number}
                    </div>
                    
                    <div className={`w-14 h-14 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center mb-6 mt-2`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tech Stack */}
          <div className="mt-16 bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6 text-center">Stack Technique</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg text-sm border border-blue-600/30 font-medium">Python 3.10+</span>
              <span className="px-4 py-2 bg-cyan-600/20 text-cyan-400 rounded-lg text-sm border border-cyan-600/30 font-medium">Pandas & NumPy</span>
              <span className="px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg text-sm border border-purple-600/30 font-medium">Scikit-learn</span>
              <span className="px-4 py-2 bg-pink-600/20 text-pink-400 rounded-lg text-sm border border-pink-600/30 font-medium">XGBoost</span>
              <span className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg text-sm border border-red-600/30 font-medium">React.js</span>
              <span className="px-4 py-2 bg-amber-600/20 text-amber-400 rounded-lg text-sm border border-amber-600/30 font-medium">Plotly</span>
              <span className="px-4 py-2 bg-green-600/20 text-green-400 rounded-lg text-sm border border-green-600/30 font-medium">FastAPI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Description */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-block bg-cyan-600/10 border border-cyan-600/20 rounded-lg px-4 py-2 mb-6">
            <span className="text-cyan-400 font-semibold">📊 Description des Données</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Dataset TMDB Movies
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Une base de données exhaustive couvrant plus de 40 ans de production cinématographique mondiale
          </p>
        </div>

        {/* Dataset Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {datasetFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 text-center hover:border-gray-600 transition-all">
                <Icon className="w-8 h-8 mx-auto mb-3 text-red-500" />
                <div className="text-2xl font-bold text-white mb-1">{feature.value}</div>
                <div className="text-sm text-gray-400">{feature.label}</div>
              </div>
            );
          })}
        </div>

        {/* Data Columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dataColumns.map((category, index) => (
            <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all">
              <h4 className="font-bold text-white mb-4 flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                {category.name}
              </h4>
              <ul className="space-y-2">
                {category.items.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-400 flex items-start">
                    <span className="text-red-500/50 mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Dataset Info Box */}
        <div className="mt-12 bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/20 rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Film className="w-6 h-6 mr-2 text-blue-400" />
                Source des données
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Le dataset provient de <strong className="text-white">TMDB (The Movie Database)</strong>, 
                une des plus grandes bases de données cinématographiques communautaires au monde. 
                Les données ont été collectées via l'API officielle TMDB.
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Dataset mis à jour en 2023</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-purple-400" />
                Qualité & Prétraitement
              </h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Les données brutes contiennent des <strong className="text-white">valeurs manquantes et aberrantes</strong> nécessitant 
                un nettoyage approfondi. Notre pipeline de preprocessing inclut la gestion des outliers, 
                l'imputation des données manquantes et la création de features enrichies.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-xs border border-green-600/30">Nettoyé</span>
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs border border-blue-600/30">Normalisé</span>
                <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-xs border border-purple-600/30">Enrichi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// DATA VIZ PAGE (PLACEHOLDER)
// ============================================
const DataVizPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Visualisation des Données
          </span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explorez les tendances du marché cinématographique à travers des graphiques interactifs
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 h-96 flex flex-col items-center justify-center">
          <BarChart3 className="w-16 h-16 text-blue-500 mb-4 opacity-50" />
          <h3 className="text-xl font-bold mb-2">Évolution du marché</h3>
          <p className="text-gray-400 text-center">Budget et revenus moyens (1980-2023)</p>
          <p className="text-sm text-amber-500 mt-4">📊 Graphique à venir cette semaine</p>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 h-96 flex flex-col items-center justify-center">
          <TrendingUp className="w-16 h-16 text-purple-500 mb-4 opacity-50" />
          <h3 className="text-xl font-bold mb-2">Analyse par genre</h3>
          <p className="text-gray-400 text-center">ROI moyen et rentabilité par genre</p>
          <p className="text-sm text-amber-500 mt-4">📊 Graphique à venir cette semaine</p>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 h-96 flex flex-col items-center justify-center">
          <Film className="w-16 h-16 text-red-500 mb-4 opacity-50" />
          <h3 className="text-xl font-bold mb-2">Saisonnalité</h3>
          <p className="text-gray-400 text-center">Meilleurs mois pour sortir un film</p>
          <p className="text-sm text-amber-500 mt-4">📊 Graphique à venir cette semaine</p>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 h-96 flex flex-col items-center justify-center">
          <BarChart3 className="w-16 h-16 text-amber-500 mb-4 opacity-50" />
          <h3 className="text-xl font-bold mb-2">Corrélations</h3>
          <p className="text-gray-400 text-center">Relations entre variables clés</p>
          <p className="text-sm text-amber-500 mt-4">📊 Graphique à venir cette semaine</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-600/20 rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold mb-3">🚧 Section en développement</h3>
        <p className="text-gray-300 mb-4">
          Les visualisations interactives seront ajoutées après l'analyse exploratoire des données dans Jupyter.
        </p>
        <p className="text-sm text-gray-400">
          Prochaine étape : Intégration des graphiques Recharts et Plotly
        </p>
      </div>
    </div>
  );
};

// ============================================
// ML MODEL PAGE (DISABLED)
// ============================================
const MLModelPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <Brain className="w-20 h-20 mx-auto mb-6 text-purple-500 opacity-50" />
        <h1 className="text-4xl font-bold mb-4">Modèle de Machine Learning</h1>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Cette section permettra d'interroger notre modèle pour prédire la rentabilité d'un film
        </p>
        <div className="inline-block bg-gray-800 border border-gray-700 rounded-lg px-6 py-3">
          <span className="text-amber-500 font-semibold">🔒 Disponible prochainement</span>
        </div>
      </div>
    </div>
  );
};

// ============================================
// FOOTER COMPONENT
// ============================================
const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="bg-gradient-to-r from-red-600 to-red-800 p-2 rounded-lg">
              <Film className="w-5 h-5" />
            </div>
            <span className="font-bold">CinéPredict</span>
          </div>
          
          <div className="text-gray-400 text-sm text-center md:text-left">
            <p>Projet Data Science & Machine Learning</p>
            <p className="mt-1">Dataset : TMDB • 930k+ films • 1980-2023</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <a
              href="https://github.com/votre-username/movie-profitability-predictor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© 2025 CinéPredict. Fait avec ❤️ pour l'analyse cinématographique</p>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'dataviz':
        return <DataVizPage />;
      case 'model':
        return <MLModelPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
}