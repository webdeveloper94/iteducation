import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Topic } from '../types';

interface TopicContentProps {
  topic: Topic;
  onClose: () => void;
}

const TopicContent: React.FC<TopicContentProps> = ({ topic, onClose }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'uz' | 'ru';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 bg-gray-900/95 z-30 overflow-y-auto"
    >
      <div className="max-w-6xl mx-auto py-12 px-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold text-center mb-12 text-blue-400"
        >
          {topic.title[currentLang]}
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Presentation Section */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">Presentation</h2>
            <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
              {/* Add your presentation viewer here */}
              <p>Presentation Viewer</p>
            </div>
          </motion.div>

          {/* Video Section */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">Video Lesson</h2>
            <div className="aspect-video bg-gray-700 rounded-lg flex items-center justify-center">
              {/* Add your video player here */}
              <p>Video Player</p>
            </div>
          </motion.div>

          {/* Slides Section */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">Slides</h2>
            <div className="grid grid-cols-2 gap-4">
              {topic.slides.map((slide, index) => (
                <div key={index} className="aspect-video bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          </motion.div>

          {/* Test Section */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 p-6 rounded-lg"
          >
            <h2 className="text-2xl font-semibold mb-4 text-blue-300">Test</h2>
            <div className="space-y-4">
              {/* Add your test component here */}
              <p>Test Component</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopicContent;
