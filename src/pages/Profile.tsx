
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { UserProfile } from '@/components/auth/UserProfile';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const Profile = () => {
  const { user, loading } = useAuth();
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const isSupabaseConfigured = !!supabaseUrl && !!supabaseAnonKey;

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user && isSupabaseConfigured) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">Your Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>
        
        {!isSupabaseConfigured && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Supabase Not Configured</AlertTitle>
            <AlertDescription>
              Please connect this project to Supabase to enable user profiles and authentication.
              Click the Supabase button in the top right corner of the editor.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="max-w-md mx-auto">
          <Card className="p-6 shadow-md">
            <UserProfile />
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
