
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { externalService } from '@/services/externalService';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Cloud, Plus, Trash2, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

const ExternalServices = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [isAdding, setIsAdding] = useState(false);
  const [newService, setNewService] = useState({
    serviceName: '',
    endpoint: '',
    apiKey: ''
  });
  
  const { data: services, isLoading } = useQuery({
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

  const saveMutation = useMutation({
    mutationFn: externalService.saveCredentials,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['external-services'] });
        setIsAdding(false);
        setNewService({
          serviceName: '',
          endpoint: '',
          apiKey: ''
        });
        toast({
          title: "Service Connected",
          description: "External service has been successfully connected."
        });
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to connect service",
          variant: "destructive"
        });
      }
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to connect service",
        variant: "destructive"
      });
    }
  });

  const testMutation = useMutation({
    mutationFn: externalService.testConnection,
    onSuccess: (data, serviceId) => {
      if (data.success) {
        toast({
          title: "Connection Successful",
          description: "Test connection to the external service was successful."
        });
      } else {
        toast({
          title: "Connection Failed",
          description: data.error || "Failed to connect to the service",
          variant: "destructive"
        });
      }
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(newService);
  };

  const handleTestConnection = (serviceId: string) => {
    testMutation.mutate(serviceId);
  };

  if (authLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">External Services Integration</h1>
          <p className="text-gray-600">Connect your Azure architecture to external services and APIs</p>
        </div>
        
        {isAdding ? (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Connect New Service</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="serviceName">Service Name</Label>
                <Input
                  id="serviceName"
                  value={newService.serviceName}
                  onChange={(e) => setNewService({ ...newService, serviceName: e.target.value })}
                  required
                  placeholder="E.g., Payment Gateway, CRM, etc."
                  className="mt-1"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="endpoint">API Endpoint</Label>
                <Input
                  id="endpoint"
                  value={newService.endpoint}
                  onChange={(e) => setNewService({ ...newService, endpoint: e.target.value })}
                  required
                  placeholder="https://api.example.com/v1"
                  className="mt-1"
                />
              </div>
              <div className="mb-6">
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={newService.apiKey}
                  onChange={(e) => setNewService({ ...newService, apiKey: e.target.value })}
                  required
                  placeholder="Enter your API key"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your API key will be securely stored and never shared.
                </p>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAdding(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={saveMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {saveMutation.isPending ? 'Connecting...' : 'Connect Service'}
                </Button>
              </div>
            </form>
          </Card>
        ) : (
          <Button 
            onClick={() => setIsAdding(true)} 
            className="mb-8 bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
          >
            <Plus size={16} />
            Connect New Service
          </Button>
        )}
        
        {isLoading ? (
          <div className="text-center py-8">Loading connected services...</div>
        ) : !services?.data || services.data.length === 0 ? (
          <Card className="p-8 text-center">
            <Cloud size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 mb-4">You don't have any external services connected yet.</p>
            <Button 
              onClick={() => setIsAdding(true)} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              Connect Your First Service
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.data.map((service: any) => (
              <Card key={service.id} className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-blue-700">{service.service_name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Connected on {new Date(service.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Cloud size={20} className="text-blue-600" />
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 break-all text-sm">{service.endpoint}</p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  <Button
                    onClick={() => handleTestConnection(service.id)}
                    disabled={testMutation.isPending && testMutation.variables === service.id}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    {testMutation.isPending && testMutation.variables === service.id ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        Testing...
                      </>
                    ) : (
                      <>
                        <CheckCircle size={14} />
                        Test Connection
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 flex items-center gap-1"
                  >
                    <Trash2 size={14} />
                    Remove
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ExternalServices;
