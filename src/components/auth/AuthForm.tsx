
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, User } from 'lucide-react';

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "You have been logged in successfully",
        });
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (signUpError) throw signUpError;

        // Create user profile
        const { data: authData } = await supabase.auth.getUser();
        if (authData?.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: authData.user.id,
              full_name: fullName,
              username: email.split('@')[0],
            });

          if (profileError) console.error("Error creating profile:", profileError);
        }
        
        toast({
          title: "Account created",
          description: "Please check your email to confirm your account",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isLogin ? 'Login to your Account' : 'Create an Account'}
      </h2>
      
      <form onSubmit={handleAuth}>
        {!isLogin && (
          <div className="mb-4">
            <Label htmlFor="fullName">Full Name</Label>
            <div className="flex mt-1">
              <div className="bg-gray-100 p-2 rounded-l-md flex items-center">
                <User size={20} className="text-gray-500" />
              </div>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={!isLogin}
                placeholder="John Doe"
                className="rounded-l-none"
              />
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <Label htmlFor="email">Email</Label>
          <div className="flex mt-1">
            <div className="bg-gray-100 p-2 rounded-l-md flex items-center">
              <Mail size={20} className="text-gray-500" />
            </div>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="rounded-l-none"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <Label htmlFor="password">Password</Label>
          <div className="flex mt-1">
            <div className="bg-gray-100 p-2 rounded-l-md flex items-center">
              <Lock size={20} className="text-gray-500" />
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
              className="rounded-l-none"
            />
          </div>
        </div>
        
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
          {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
        </Button>
        
        <p className="text-center mt-4 text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline ml-2"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </form>
    </Card>
  );
};
