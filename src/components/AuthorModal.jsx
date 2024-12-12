import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const AuthorModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#1a1a3a] rounded-xl shadow-xl w-full max-w-lg p-6 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold text-white mb-6">
            {t('author.title')}
          </h2>

          <div className="space-y-4 text-white/80">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {t('author.name')}
              </h3>
              <p>Tohirov To'lqin</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {t('author.position')}
              </h3>
              <p>Maxsus fan o'qituvchisi</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {t('author.workplace')}
              </h3>
              <p>Peshku tuman 1-son kasb-hunar maktabi</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {t('author.contact')}
              </h3>
              <div className="flex gap-4 mt-2">
                <a
                  href="https://t.me/Aspire_578"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-colors"
                >
                  Telegram
                </a>
                <a
                  href="mailto:tulkintakhirov@gmail.com"
                  className="px-4 py-2 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthorModal;
