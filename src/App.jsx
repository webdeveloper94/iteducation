import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './i18n';
import TopicContent from './components/TopicContent';
import Topics from './components/Topics';
import AuthorModal from './components/AuthorModal';
import LanguageSelector from './components/LanguageSelector';
import InternetConnectionAlert from './components/InternetConnectionAlert';

const Home = () => {
  const { t } = useTranslation();
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);

  const features = [
    {
      icon: "🌐",
      title: t('home.features.multilingual.title'),
      description: t('home.features.multilingual.description')
    },
    {
      icon: "🎯",
      title: t('home.features.interactive.title'),
      description: t('home.features.interactive.description')
    },
    {
      icon: "📱",
      title: t('home.features.modern.title'),
      description: t('home.features.modern.description')
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {t('home.title')}
            </span>
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {t('home.description')}
          </p>
          <Link
            to="/topics"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            {t('home.startButton')}
          </Link>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * index }}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/60">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <AuthorModal
        isOpen={isAuthorModalOpen}
        onClose={() => setIsAuthorModalOpen(false)}
      />
    </div>
  );
};

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Router>
      <InternetConnectionAlert />
      <div className="min-h-screen bg-gradient-to-b from-[#0f0f2e] to-[#1a1a3a]">
        <nav className="bg-[#1a1a3a]/50 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center">
                <h1 className="text-white font-bold text-xl">ATK</h1>
              </Link>
              <div className="flex items-center gap-6">
                <Link
                  to="/"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {t('nav.home')}
                </Link>
                <Link
                  to="/topics"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {t('nav.topics')}
                </Link>
                <button
                  onClick={() => setIsAuthorModalOpen(true)}
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  {t('nav.about')}
                </button>
                <LanguageSelector />
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topics" element={<Topics onTopicSelect={setSelectedTopic} />} />
            <Route path="/topic/:topicId" element={<TopicContent topic={selectedTopic} onBack={() => setSelectedTopic(null)} />} />
          </Routes>
        </main>

        <AuthorModal
          isOpen={isAuthorModalOpen}
          onClose={() => setIsAuthorModalOpen(false)}
        />
      </div>
    </Router>
  );
}

export default App;
