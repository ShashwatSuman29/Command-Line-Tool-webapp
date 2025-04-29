import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AuthModals from './AuthModals';

const Navbar = () => {
  const { toast } = useToast();
  const { user, isLoggedIn, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
      duration: 3000
    });
  };

  return (
    <>
      <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex items-center space-x-2">
                <div className="p-1 bg-indigo-500/20 rounded">
                  <LogIn size={20} className="text-indigo-400" />
                </div>
                <span className="text-xl font-bold text-white">DevHelper CLI</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-slate-300 hover:text-indigo-400 transition">Home</Link>
              <Link to="#features" className="text-slate-300 hover:text-indigo-400 transition">Features</Link>
              <Link to="#docs" className="text-slate-300 hover:text-indigo-400 transition">Documentation</Link>
              <Link to="#install" className="text-slate-300 hover:text-indigo-400 transition">Installation</Link>
            </div>
            
            <div className="flex items-center space-x-3">
              {isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <div className="hidden md:flex items-center space-x-2 text-sm text-slate-300">
                    <User size={16} />
                    <span>{user?.email}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-indigo-500 text-indigo-400 hover:bg-indigo-950"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} className="mr-2" />
                    <span className="hidden sm:inline">Sign Out</span>
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-indigo-500 text-indigo-400 hover:bg-indigo-950"
                  onClick={handleOpenAuthModal}
                >
                  <LogIn size={16} className="mr-2" />
                  <span className="hidden sm:inline">Sign In</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <AuthModals 
        isOpen={isAuthModalOpen} 
        onClose={handleCloseAuthModal} 
      />
    </>
  );
};

export default Navbar;
