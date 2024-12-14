import React from 'react';

const PDFViewer = ({ url }) => {
  return (
    <div className="w-full h-screen bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden">
      <iframe
        src={url}
        className="w-full h-full"
        title="PDF Viewer"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};

export default PDFViewer;
