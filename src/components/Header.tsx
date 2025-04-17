
import React, { useState } from 'react';
import { CloudCog, Menu, X, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out."
      });
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sign out",
        variant: "destructive"
      });
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 to-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <CloudCog size={32} />
            <div>
              <h1 className="text-2xl font-bold">CloudStream Architect</h1>
              <p className="text-sm text-blue-100">Azure DevOps Architecture Solution</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-blue-200 transition-colors">
              Designer
            </Link>
            {user && (
              <>
                <Link to="/dashboard" className="text-white hover:text-blue-200 transition-colors">
                  Dashboard
                </Link>
                <Link to="/configurations" className="text-white hover:text-blue-200 transition-colors">
                  Configurations
                </Link>
                <Link to="/external-services" className="text-white hover:text-blue-200 transition-colors">
                  External Services
                </Link>
              </>
            )}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile">
                  <Avatar className="h-9 w-9 border-2 border-white">
                    <AvatarFallback className="bg-blue-800 text-white">
                      {user.email?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-blue-800/50"
                  onClick={handleSignOut}
                >
                  <LogOut size={18} className="mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button className="bg-white text-blue-700 hover:bg-blue-100">
                  Sign In
                </Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-blue-600">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-white hover:text-blue-200 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Designer
              </Link>
              {user && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-white hover:text-blue-200 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/configurations" 
                    className="text-white hover:text-blue-200 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Configurations
                  </Link>
                  <Link 
                    to="/external-services" 
                    className="text-white hover:text-blue-200 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    External Services
                  </Link>
                  <Link 
                    to="/profile" 
                    className="text-white hover:text-blue-200 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    className="flex items-center text-white hover:text-blue-200 transition-colors"
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </button>
                </>
              )}
              {!user && (
                <Link 
                  to="/login" 
                  className="bg-white text-blue-700 hover:bg-blue-100 py-2 px-4 rounded text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
