import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

const VideoModal = ({ isOpen, onClose, videoUrl }) => {
  // YouTube video ID ni olish
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    
    // youtu.be formatidagi URL uchun
    if (url.includes('youtu.be')) {
      const id = url.split('youtu.be/')[1];
      return id ? id.split('?')[0] : null;
    }
    
    // youtube.com formatidagi URL uchun
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(videoUrl);
  // Yangi embed URL formati
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1` : null;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#1a1a3a] rounded-xl shadow-xl w-full max-w-5xl h-[90vh] p-6 relative flex flex-col"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold text-white mb-6">Video darslik</h2>

          <div className="flex-1 bg-black rounded-lg overflow-hidden relative pt-[56.25%]">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                className="absolute top-0 left-0 w-full h-full"
                title="YouTube Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-white">
                Video topilmadi
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default VideoModal;
