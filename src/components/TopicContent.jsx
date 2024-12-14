import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import VideoModal from './VideoModal';
import PresentationViewer from './PresentationViewer';
import PDFViewer from './PDFViewer';
import QuizModal from './QuizModal';
import { topics } from '../data/topics';

const TopicContent = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [activeContent, setActiveContent] = useState('pdf'); // 'pdf' or 'presentation'
  const { t, i18n } = useTranslation();
  const { topicId } = useParams();

  const topic = topics.find(t => t.id === topicId);

  if (!topic) {
    return (
      <div className="min-h-screen bg-[#0a0a1f] flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl mb-4">{t('notFound.title')}</h2>
          <Link 
            to="/topics"
            className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {t('notFound.backToTopics')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a1f]">
      {/* Background with animated gradient */}
      <div className="fixed inset-0 bg-[#0a0a1f] z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-blue-900/20" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white/5 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link 
                to="/topics"
                className="text-white/80 hover:text-white flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span>←</span>
                <span>{t('buttons.back')}</span>
              </Link>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {t(`topics.${topic.id}.title`)}
              </h1>
              <div className="w-24" /> {/* Spacer for centering */}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Topic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-8 mb-12"
          >
            <div className="flex items-start gap-6">
              <div className="text-6xl">{topic.icon}</div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">{t(`topics.${topic.id}.title`)}</h2>
                <p className="text-lg text-white/80 mb-6">{t(`topics.${topic.id}.description`)}</p>
                <div className="flex flex-wrap gap-4">
                  {topic.keyPoints.map((point, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="px-4 py-2 rounded-full bg-white/10 text-blue-200/80"
                    >
                      {point}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Viewer */}
          <div className="mb-8">
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setActiveContent('pdf')}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  activeContent === 'pdf'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/5 text-white/80 hover:bg-white/10'
                }`}
              >
                {t('buttons.viewPDF')}
              </button>
              <button
                onClick={() => setActiveContent('presentation')}
                className={`px-6 py-3 rounded-lg transition-colors ${
                  activeContent === 'presentation'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/5 text-white/80 hover:bg-white/10'
                }`}
              >
                {t('buttons.viewPresentation')}
              </button>
            </div>
            
            {activeContent === 'pdf' ? (
              <PDFViewer url={topic.pdfUrl[i18n.language]} />
            ) : (
              <PresentationViewer url={topic.presentationUrl[i18n.language]} />
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => setActiveModal('video')}
              className="group p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  🎥
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-white mb-2">{t('buttons.watchVideo')}</h3>
                  <p className="text-white/60">{t('buttons.watchVideoDescription')}</p>
                </div>
              </div>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              onClick={() => setActiveModal('quiz')}
              className="group p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  ✅
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-white mb-2">{t('buttons.takeQuiz')}</h3>
                  <p className="text-white/60">{t('buttons.takeQuizDescription')}</p>
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === 'video' && (
        <VideoModal
          isOpen={activeModal === 'video'}
          videoUrl={topic.videoUrl[i18n.language]}
          onClose={() => setActiveModal(null)}
        />
      )}
      {activeModal === 'quiz' && (
        <QuizModal
          isOpen={activeModal === 'quiz'}
          topicId={topic.id}
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
};

export default TopicContent;
