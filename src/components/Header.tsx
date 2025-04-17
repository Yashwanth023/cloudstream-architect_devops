
import React from 'react';
import { CloudCog } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CloudCog size={32} />
            <div>
              <h1 className="text-2xl font-bold">CloudStream Architect</h1>
              <p className="text-sm text-blue-100">Azure DevOps Architecture Solution</p>
            </div>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">Modus ETP Technical Assignment</p>
          </div>
        </div>
      </div>
    </header>
  );
};
