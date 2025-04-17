
import React from 'react';
import { Card } from '@/components/ui/card';
import { componentDetails } from '@/data/componentDetails';

export const DetailsPanel = ({ selectedComponent }: { selectedComponent: string | null }) => {
  if (!selectedComponent) {
    return (
      <Card className="p-6 h-full shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Component Details</h2>
        <p className="text-gray-600">Click on any component in the architecture diagram to view its details.</p>
        
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3 text-blue-700">Architecture Highlights</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
              <span className="text-gray-700">High Availability across multiple zones</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
              <span className="text-gray-700">Security at all tiers with defense in depth</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
              <span className="text-gray-700">Auto-scaling to handle 1000 RPS</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
              <span className="text-gray-700">Geo-replicated database for fault tolerance</span>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">✓</span>
              <span className="text-gray-700">Comprehensive monitoring and alerting</span>
            </li>
          </ul>
        </div>
      </Card>
    );
  }

  const details = componentDetails[selectedComponent] || {
    title: 'Unknown Component',
    description: 'No details available for this component.',
    features: [],
    benefits: [],
  };

  return (
    <Card className="p-6 h-full shadow-lg">
      <h2 className="text-xl font-bold mb-2 text-blue-700">{details.title}</h2>
      <p className="text-gray-600 mb-6">{details.description}</p>
      
      {details.features.length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-semibold mb-2 text-gray-800">Key Features</h3>
          <ul className="list-disc pl-5 space-y-1">
            {details.features.map((feature, index) => (
              <li key={index} className="text-gray-600 text-sm">{feature}</li>
            ))}
          </ul>
        </div>
      )}
      
      {details.benefits.length > 0 && (
        <div>
          <h3 className="text-md font-semibold mb-2 text-gray-800">Benefits</h3>
          <ul className="list-disc pl-5 space-y-1">
            {details.benefits.map((benefit, index) => (
              <li key={index} className="text-gray-600 text-sm">{benefit}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};
