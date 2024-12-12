import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Topic } from '../types';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

interface TopicsProps {
  isVisible: boolean;
  onTopicSelect: (topic: Topic) => void;
}

const Topics: React.FC<TopicsProps> = ({ isVisible, onTopicSelect }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'uz' | 'ru';

  // Sample topics (you can expand this)
  const topics: Topic[] = [
    {
      id: 1,
      title: {
        en: "Introduction to Information Technology",
        uz: "Axborot texnologiyalariga kirish",
        ru: "Введение в информационные технологии"
      },
      content: {
        presentation: "/presentations/intro.pdf",
        videoUrl: "/videos/intro.mp4",
        slides: ["/slides/intro1.jpg", "/slides/intro2.jpg"],
        test: []
      }
    },
    // Add more topics here
  ];

  if (!isVisible) return null;

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="fixed inset-0 bg-gray-900/95 z-20 overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto py-12 px-4">
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold text-center mb-8 text-blue-400"
        >
          {t('topics')}
        </motion.h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <motion.div
              key={topic.id}
              variants={item}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-800 p-6 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
              onClick={() => onTopicSelect(topic)}
            >
              <h3 className="text-xl font-semibold text-blue-300 mb-2">
                {topic.title[currentLang]}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Topics;
