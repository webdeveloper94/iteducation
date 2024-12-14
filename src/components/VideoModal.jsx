import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

const VideoModal = ({ isOpen, onClose, videoUrl }) => {
  const getEmbedHtml = (url) => {
    if (!url) return null;
    
    // Google Drive ID ni olish
    const fileId = url.match(/[-\w]{25,}/);
    if (!fileId) return null;

    // HTML kodini yaratish
    return `<iframe src="https://drive.google.com/file/d/${fileId[0]}/preview" width="100%" height="100%" allow="autoplay" allowfullscreen></iframe>`;
  };

  if (!isOpen) return null;

  const embedHtml = getEmbedHtml(videoUrl);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#1a1a3a] rounded-xl shadow-xl w-full max-w-4xl p-4 relative"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-white/60 hover:text-white text-xl"
          >
            ✕
          </button>

          <div 
            className="relative w-full pt-[56.25%] rounded-lg overflow-hidden bg-black/50"
          >
            {embedHtml ? (
              <div 
                className="absolute top-0 left-0 w-full h-full"
                dangerouslySetInnerHTML={{ __html: embedHtml }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white">
                Video topilmadi
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoModal;
