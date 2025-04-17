
import React, { useState } from 'react';
import { 
  Cloud, 
  Database, 
  Server, 
  Shield, 
  Globe, 
  Lock, 
  BarChart, 
  Layers,
  Network
} from 'lucide-react';

type ComponentProps = {
  id: string;
  x: number;
  y: number;
  icon: React.ReactNode;
  label: string;
  color: string;
  width?: number;
  height?: number;
};

type ConnectionProps = {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
};

export const ArchitectureDiagram = ({ 
  onSelectComponent 
}: { 
  onSelectComponent: (componentId: string | null) => void 
}) => {
  const [hoveredComponent, setHoveredComponent] = useState<string | null>(null);
  
  const components: ComponentProps[] = [
    { id: 'trafficManager', x: 200, y: 50, icon: <Globe />, label: 'Azure Traffic Manager', color: 'bg-blue-100' },
    { id: 'waf', x: 200, y: 130, icon: <Shield />, label: 'Web Application Firewall', color: 'bg-red-100' },
    { id: 'frontendScaleSet', x: 200, y: 210, icon: <Layers />, label: 'App Service Scale Set', color: 'bg-green-100' },
    { id: 'apiManagement', x: 200, y: 290, icon: <Network />, label: 'API Management', color: 'bg-purple-100' },
    { id: 'backendScaleSet', x: 200, y: 370, icon: <Server />, label: 'Backend Service Scale Set', color: 'bg-yellow-100' },
    { id: 'sqlDbPrimary', x: 120, y: 450, icon: <Database />, label: 'Azure SQL Primary', color: 'bg-indigo-100' },
    { id: 'sqlDbSecondary', x: 280, y: 450, icon: <Database />, label: 'Azure SQL Secondary', color: 'bg-indigo-100' },
    { id: 'keyvault', x: 40, y: 290, icon: <Lock />, label: 'Azure Key Vault', color: 'bg-gray-100' },
    { id: 'monitor', x: 360, y: 290, icon: <BarChart />, label: 'Azure Monitor', color: 'bg-teal-100' },
    { id: 'externalServices', x: 360, y: 370, icon: <Cloud />, label: 'External Services', color: 'bg-orange-100' },
  ];

  const connections: ConnectionProps[] = [
    { from: 'trafficManager', to: 'waf' },
    { from: 'waf', to: 'frontendScaleSet' },
    { from: 'frontendScaleSet', to: 'apiManagement' },
    { from: 'apiManagement', to: 'backendScaleSet' },
    { from: 'backendScaleSet', to: 'sqlDbPrimary' },
    { from: 'backendScaleSet', to: 'sqlDbSecondary' },
    { from: 'backendScaleSet', to: 'externalServices' },
    { from: 'keyvault', to: 'backendScaleSet', dashed: true },
    { from: 'monitor', to: 'backendScaleSet', dashed: true },
    { from: 'monitor', to: 'frontendScaleSet', dashed: true },
    { from: 'monitor', to: 'sqlDbPrimary', dashed: true },
    { from: 'sqlDbPrimary', to: 'sqlDbSecondary', label: 'Replication' },
  ];

  const getComponent = (id: string) => components.find(c => c.id === id);

  const renderConnections = () => {
    return connections.map((connection, index) => {
      const fromComponent = getComponent(connection.from);
      const toComponent = getComponent(connection.to);
      
      if (!fromComponent || !toComponent) return null;
      
      // Calculate the path
      const x1 = fromComponent.x + 60; // center of component
      const y1 = fromComponent.y + 30; // center of component
      const x2 = toComponent.x + 60;
      const y2 = toComponent.y + 30;

      // For straight lines:
      const path = `M ${x1} ${y1} L ${x2} ${y2}`;
      
      return (
        <g key={`connection-${index}`}>
          <path 
            d={path} 
            stroke="#94a3b8" 
            strokeWidth="2" 
            fill="none" 
            strokeDasharray={connection.dashed ? "5,5" : "none"}
          />
          {connection.label && (
            <text 
              x={(x1 + x2) / 2} 
              y={((y1 + y2) / 2) - 8} 
              fontSize="10" 
              textAnchor="middle" 
              fill="#64748b"
              style={{ backgroundColor: 'white', padding: '0 4px' }}
            >
              {connection.label}
            </text>
          )}
        </g>
      );
    });
  };

  const handleComponentClick = (componentId: string) => {
    onSelectComponent(componentId);
  };

  return (
    <div className="w-full overflow-auto border border-gray-200 rounded-lg bg-white p-4">
      <svg width="440" height="520" className="mx-auto">
        {/* Render connections first so they appear behind components */}
        {renderConnections()}
        
        {/* Render components */}
        {components.map((component) => (
          <g 
            key={component.id}
            transform={`translate(${component.x}, ${component.y})`}
            onClick={() => handleComponentClick(component.id)}
            onMouseEnter={() => setHoveredComponent(component.id)}
            onMouseLeave={() => setHoveredComponent(null)}
            style={{ cursor: 'pointer' }}
          >
            <rect 
              width={component.width || 120} 
              height={component.height || 60} 
              rx="8" 
              className={`${component.color} ${hoveredComponent === component.id ? 'stroke-blue-500 stroke-2' : 'stroke-gray-300'}`}
              fill="current"
            />
            <foreignObject width="24" height="24" x="10" y="18">
              <div className="text-gray-600">
                {component.icon}
              </div>
            </foreignObject>
            <text x="42" y="35" fontSize="12" fill="#334155" fontWeight="500">
              {component.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
