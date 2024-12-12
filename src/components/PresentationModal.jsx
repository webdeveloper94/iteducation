import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PresentationModal = ({ isOpen, onClose, pdfUrl }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#1a1a3a] rounded-xl shadow-xl w-full h-[90vh] p-6 relative flex flex-col"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold text-white mb-6">Taqdimot</h2>

          <div className="flex-1 bg-white rounded-lg overflow-hidden">
            <iframe
              src={`${pdfUrl}#toolbar=0`}
              className="w-full h-full"
              title="PDF Viewer"
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PresentationModal;
