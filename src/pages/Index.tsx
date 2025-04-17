
import React, { useState } from 'react';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';
import { Header } from '@/components/Header';
import { DetailsPanel } from '@/components/DetailsPanel';
import { Footer } from '@/components/Footer';
import { RequirementsDisplay } from '@/components/RequirementsDisplay';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [showDeploymentPlan, setShowDeploymentPlan] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-blue-700">Azure Cloud Architecture</h2>
              <RequirementsDisplay />
              <div className="mt-6 mb-8">
                <ArchitectureDiagram onSelectComponent={setSelectedComponent} />
              </div>
              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={() => setShowDeploymentPlan(!showDeploymentPlan)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {showDeploymentPlan ? 'Hide Deployment Plan' : 'Show Deployment Plan'}
                </Button>
              </div>
              
              {showDeploymentPlan && (
                <div className="mt-8 bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-semibold mb-4 text-blue-700">Deployment & Release Plan</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">1. Infrastructure as Code Setup</h4>
                      <p className="text-gray-600">Use Azure Resource Manager (ARM) templates or Terraform to define all infrastructure components.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">2. CI/CD Pipeline Implementation</h4>
                      <p className="text-gray-600">Configure Azure DevOps pipelines for automated build, test, and deployment processes.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">3. Deployment Stages</h4>
                      <ul className="list-disc pl-5 text-gray-600">
                        <li>Development environment deployment for continuous integration</li>
                        <li>QA/Test environment for integration and load testing</li>
                        <li>Staging environment that mirrors production</li>
                        <li>Production deployment with blue/green strategy</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">4. Database Migration Strategy</h4>
                      <p className="text-gray-600">Implement automated SQL database schema migrations and data seeding.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">5. Monitoring & Rollback Strategy</h4>
                      <p className="text-gray-600">Configure Azure Monitor alerts and application insights for real-time monitoring. Implement automated rollback procedures.</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <DetailsPanel selectedComponent={selectedComponent} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
