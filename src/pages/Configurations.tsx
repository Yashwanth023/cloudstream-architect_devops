
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { configService } from '@/services/configService';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { PlusCircle, Trash2, Edit, Save, X, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ArchitectureConfig } from '@/lib/supabase';

const Configurations = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [newConfig, setNewConfig] = useState({ name: '', description: '' });
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', description: '' });
  
  const { data: configs, isLoading } = useQuery({
    queryKey: ['configs'],
    queryFn: configService.getConfigs,
    enabled: !!user,
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const createMutation = useMutation({
    mutationFn: configService.createConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['configs'] });
      setNewConfig({ name: '', description: '' });
      setIsCreating(false);
      toast({
        title: "Configuration Created",
        description: "Your new architecture configuration has been created successfully."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create configuration",
        variant: "destructive"
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string, updates: Partial<ArchitectureConfig> }) => 
      configService.updateConfig(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['configs'] });
      setEditingId(null);
      toast({
        title: "Configuration Updated",
        description: "Your architecture configuration has been updated successfully."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update configuration",
        variant: "destructive"
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: configService.deleteConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['configs'] });
      toast({
        title: "Configuration Deleted",
        description: "Your architecture configuration has been deleted successfully."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete configuration",
        variant: "destructive"
      });
    }
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({
      ...newConfig,
      components: {}
    });
  };

  const handleEditSubmit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    updateMutation.mutate({
      id,
      updates: editForm
    });
  };

  const startEditing = (config: ArchitectureConfig) => {
    setEditingId(config.id);
    setEditForm({
      name: config.name,
      description: config.description
    });
  };

  const handleViewConfig = (id: string) => {
    navigate(`/config/${id}`);
  };

  const handleShareConfig = async (id: string) => {
    const email = prompt("Enter the email address to share with:");
    if (!email) return;

    try {
      await configService.shareConfig(id, email);
      toast({
        title: "Configuration Shared",
        description: `Your architecture configuration has been shared with ${email}.`
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to share configuration",
        variant: "destructive"
      });
    }
  };

  if (authLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Your Architecture Configurations</h1>
          <p className="text-gray-600">Manage and create your Azure architecture configurations</p>
        </div>
        
        {isCreating ? (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Create New Configuration</h2>
            <form onSubmit={handleCreateSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="name">Configuration Name</label>
                <Input
                  id="name"
                  value={newConfig.name}
                  onChange={(e) => setNewConfig({ ...newConfig, name: e.target.value })}
                  required
                  placeholder="E.g., Production Architecture"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
                <Input
                  id="description"
                  value={newConfig.description}
                  onChange={(e) => setNewConfig({ ...newConfig, description: e.target.value })}
                  placeholder="Brief description of this configuration"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreating(false)}
                  className="flex items-center gap-1"
                >
                  <X size={16} />
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
                >
                  <Save size={16} />
                  {createMutation.isPending ? 'Creating...' : 'Create Configuration'}
                </Button>
              </div>
            </form>
          </Card>
        ) : (
          <Button 
            onClick={() => setIsCreating(true)} 
            className="mb-8 bg-blue-600 hover:bg-blue-700 flex items-center gap-1"
          >
            <PlusCircle size={16} />
            Create New Configuration
          </Button>
        )}
        
        {isLoading ? (
          <div className="text-center py-8">Loading your configurations...</div>
        ) : configs?.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-gray-600 mb-4">You don't have any saved configurations yet.</p>
            <Button 
              onClick={() => setIsCreating(true)} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              Create Your First Configuration
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {configs?.map((config) => (
              <Card key={config.id} className="p-6 hover:shadow-lg transition-shadow">
                {editingId === config.id ? (
                  <form onSubmit={(e) => handleEditSubmit(e, config.id!)}>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2" htmlFor={`edit-name-${config.id}`}>Name</label>
                      <Input
                        id={`edit-name-${config.id}`}
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2" htmlFor={`edit-desc-${config.id}`}>Description</label>
                      <Input
                        id={`edit-desc-${config.id}`}
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setEditingId(null)}
                        size="sm"
                      >
                        Cancel
                      </Button>
                      <Button 
                        type="submit" 
                        size="sm"
                        disabled={updateMutation.isPending}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {updateMutation.isPending ? 'Saving...' : 'Save'}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h3 className="text-lg font-bold mb-2 text-blue-700">{config.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{config.description}</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Created: {new Date(config.created_at!).toLocaleDateString()}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        onClick={() => handleViewConfig(config.id!)} 
                        className="flex-1 min-w-[80px] bg-blue-600 hover:bg-blue-700"
                        size="sm"
                      >
                        View
                      </Button>
                      <Button 
                        onClick={() => startEditing(config)} 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Edit size={14} />
                        Edit
                      </Button>
                      <Button 
                        onClick={() => handleShareConfig(config.id!)} 
                        variant="outline" 
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Share2 size={14} />
                        Share
                      </Button>
                      <Button 
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this configuration?')) {
                            deleteMutation.mutate(config.id!);
                          }
                        }} 
                        variant="outline" 
                        size="sm"
                        className="text-red-600 hover:bg-red-50 flex items-center gap-1"
                      >
                        <Trash2 size={14} />
                        Delete
                      </Button>
                    </div>
                  </>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Configurations;
