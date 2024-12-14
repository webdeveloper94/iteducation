import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import quizData from '../data/quizData';

const QuizModal = ({ topicId, isOpen, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const { i18n, t } = useTranslation();

  const questions = quizData[topicId]?.[i18n.language]?.questions || [];

  useEffect(() => {
    if (isOpen) {
      setCurrentQuestion(0);
      setScore(0);
      setShowScore(false);
      setSelectedAnswer(null);
      setIsAnswered(false);
    }
  }, [isOpen]);

  const handleAnswerClick = (optionIndex) => {
    if (isAnswered) return;

    setSelectedAnswer(optionIndex);
    setIsAnswered(true);

    if (optionIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const getOptionClassName = (optionIndex) => {
    if (!isAnswered) return 'bg-white/10 hover:bg-white/20';
    if (optionIndex === questions[currentQuestion].correctAnswer) {
      return 'bg-green-500/50 hover:bg-green-500/60';
    }
    if (optionIndex === selectedAnswer && optionIndex !== questions[currentQuestion].correctAnswer) {
      return 'bg-red-500/50 hover:bg-red-500/60';
    }
    return 'bg-white/10';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#1a1a3a] rounded-xl shadow-xl w-full max-w-2xl p-6"
          >
            {showScore ? (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {t('quiz.completed')}
                </h2>
                <p className="text-xl text-white mb-6">
                  {t('quiz.score')}: {score} / {questions.length}
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('common.close')}
                </button>
              </div>
            ) : questions.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-white">
                    {t('quiz.question')} {currentQuestion + 1} / {questions.length}
                  </h2>
                  <button
                    onClick={onClose}
                    className="text-white/60 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-8">
                  <p className="text-lg text-white mb-6">
                    {questions[currentQuestion].question}
                  </p>

                  <div className="space-y-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerClick(index)}
                        disabled={isAnswered}
                        className={`w-full p-4 text-left text-white rounded-lg transition-colors ${getOptionClassName(
                          index
                        )}`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {t('quiz.noQuestions')}
                </h2>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t('common.close')}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuizModal;
