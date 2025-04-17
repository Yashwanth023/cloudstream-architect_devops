
import React from 'react';
import { Database, Zap, Link2 } from 'lucide-react';

export const RequirementsDisplay = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center">
        <Database className="h-6 w-6 text-blue-600 mr-3" />
        <div>
          <h3 className="font-medium text-gray-800">SQL Database</h3>
          <p className="text-sm text-gray-500">Managed database service</p>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center">
        <Zap className="h-6 w-6 text-blue-600 mr-3" />
        <div>
          <h3 className="font-medium text-gray-800">High Performance</h3>
          <p className="text-sm text-gray-500">1000 requests per second</p>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex items-center">
        <Link2 className="h-6 w-6 text-blue-600 mr-3" />
        <div>
          <h3 className="font-medium text-gray-800">External Integration</h3>
          <p className="text-sm text-gray-500">3rd party service connections</p>
        </div>
      </div>
    </div>
  );
};
