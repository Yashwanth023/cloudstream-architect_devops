
import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© 2025 CloudStream Architecture Solution</p>
          </div>
          <div className="flex space-x-4">
            <p className="text-sm text-gray-300">Designed for Modus ETP</p>
            <p className="text-sm text-gray-300">Azure DevOps Engineer Assignment</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
