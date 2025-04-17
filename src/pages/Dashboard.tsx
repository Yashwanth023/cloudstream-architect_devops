
import React, { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { configService } from '@/services/configService';
import { externalService } from '@/services/externalService';
import { 
  LayoutDashboard, 
  Settings, 
  FileText, 
  Users, 
  Cloud, 
  Database, 
  ServerCrash,
  Package,
  FileImage,
  ArrowRight
} from 'lucide-react';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const { data: configs, isLoading: configsLoading } = useQuery({
    queryKey: ['configs'],
    queryFn: configService.getConfigs,
    enabled: !!user,
  });
  
  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ['external-services'],
    queryFn: externalService.listConnectedServices,
    enabled: !!user,
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  const userEmail = user?.email || 'User';
  const configsCount = configs?.length || 0;
  const servicesCount = services?.data?.length || 0;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {userEmail}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-white border-blue-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-blue-800">Architectures</h3>
              <div className="bg-blue-100 p-2 rounded-full">
                <FileImage size={20} className="text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-blue-700 mb-1">{configsCount}</p>
            <p className="text-sm text-blue-600">Saved configurations</p>
            <Button 
              onClick={() => navigate('/configurations')} 
              variant="link" 
              className="mt-4 p-0 h-auto text-blue-600"
            >
              Manage Configurations
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-white border-purple-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-purple-800">External Services</h3>
              <div className="bg-purple-100 p-2 rounded-full">
                <Cloud size={20} className="text-purple-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-purple-700 mb-1">{servicesCount}</p>
            <p className="text-sm text-purple-600">Connected services</p>
            <Button 
              onClick={() => navigate('/external-services')} 
              variant="link" 
              className="mt-4 p-0 h-auto text-purple-600"
            >
              Manage Services
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-green-50 to-white border-green-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-green-800">Database Status</h3>
              <div className="bg-green-100 p-2 rounded-full">
                <Database size={20} className="text-green-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-green-700 mb-1">Healthy</p>
            <p className="text-sm text-green-600">SQL Database monitoring</p>
            <Button 
              onClick={() => navigate('/database')} 
              variant="link" 
              className="mt-4 p-0 h-auto text-green-600"
            >
              View Database Details
              <ArrowRight size={14} className="ml-1" />
            </Button>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-700">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                onClick={() => navigate('/configurations')} 
                variant="outline" 
                className="justify-start h-auto py-3"
              >
                <FileText className="mr-2 h-5 w-5 text-blue-600" />
                <span>View Architectures</span>
              </Button>
              <Button 
                onClick={() => navigate('/external-services')} 
                variant="outline" 
                className="justify-start h-auto py-3"
              >
                <Cloud className="mr-2 h-5 w-5 text-blue-600" />
                <span>Manage Services</span>
              </Button>
              <Button 
                onClick={() => navigate('/profile')} 
                variant="outline" 
                className="justify-start h-auto py-3"
              >
                <Users className="mr-2 h-5 w-5 text-blue-600" />
                <span>Profile Settings</span>
              </Button>
              <Button 
                onClick={() => navigate('/')} 
                variant="outline" 
                className="justify-start h-auto py-3"
              >
                <Settings className="mr-2 h-5 w-5 text-blue-600" />
                <span>Architecture Designer</span>
              </Button>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-700">System Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ServerCrash className="h-5 w-5 mr-2 text-green-500" />
                  <span>Web Service</span>
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  Operational
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Database className="h-5 w-5 mr-2 text-green-500" />
                  <span>SQL Database</span>
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  Operational
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Package className="h-5 w-5 mr-2 text-green-500" />
                  <span>External Integration</span>
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  Operational
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Cloud className="h-5 w-5 mr-2 text-yellow-500" />
                  <span>Cloud Storage</span>
                </div>
                <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">
                  High Load
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 text-blue-700">Recent Activity</h3>
          {configsLoading ? (
            <p>Loading activity...</p>
          ) : configsCount === 0 ? (
            <p className="text-gray-600">No recent activities to display. Start by creating your first architecture configuration.</p>
          ) : (
            <div className="space-y-4">
              {configs?.slice(0, 5).map((config: any) => (
                <div key={config.id} className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <FileText size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{config.name} configuration was created</p>
                    <p className="text-sm text-gray-500">{new Date(config.created_at).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
