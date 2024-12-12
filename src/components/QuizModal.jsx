import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { quizData } from '../data/quizData';

const QuizModal = ({ topicId, isOpen, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const questions = quizData[topicId]?.questions || [];

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

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  if (!quizData[topicId]) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-2xl bg-[#0a0a1f] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">
                {quizData[topicId].title} - Test
              </h2>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white bg-white/10 rounded-lg p-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Quiz Content */}
            <div className="p-6">
              {showScore ? (
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Test yakunlandi!
                  </h3>
                  <p className="text-xl text-white mb-6">
                    Sizning natijangiz: {score} / {questions.length}
                  </p>
                  <button
                    onClick={restartQuiz}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Qayta boshlash
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-white/60">
                        Savol {currentQuestion + 1} / {questions.length}
                      </span>
                      <span className="text-white/60">Ball: {score}</span>
                    </div>
                    <h3 className="text-xl text-white mb-6">
                      {questions[currentQuestion].question}
                    </h3>
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
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuizModal;
