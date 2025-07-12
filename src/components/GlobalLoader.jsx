// src/components/GlobalLoader.jsx
import React from "react";

const GlobalLoader = () => {
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid"></div>
    </div>
  );
};

export default GlobalLoader;
