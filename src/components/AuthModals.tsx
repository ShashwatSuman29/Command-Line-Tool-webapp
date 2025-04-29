import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { LogIn, UserRound } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalsProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'signup';
}

const AuthModals: React.FC<AuthModalsProps> = ({ 
  isOpen, 
  onClose, 
  defaultTab = 'login' 
}) => {
  const { toast } = useToast();
  const { login, register, loading } = useAuth();
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!authData.email || !authData.password) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    try {
      await login(authData.email, authData.password);
      toast({
        title: "Login Successful",
        description: "You've been logged in successfully",
        duration: 3000
      });
      onClose();
    } catch (err) {
      toast({
        title: "Login Failed",
        description: err instanceof Error ? err.message : "An error occurred during login",
        variant: "destructive",
        duration: 3000
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!authData.email || !authData.password) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    try {
      await register(authData.email, authData.password);
      toast({
        title: "Account Created",
        description: "Your account has been created successfully",
        duration: 3000
      });
      onClose();
    } catch (err) {
      toast({
        title: "Registration Failed",
        description: err instanceof Error ? err.message : "An error occurred during registration",
        variant: "destructive",
        duration: 3000
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-black border-slate-800">
        <DialogHeader>
          <div className="mx-auto p-2 bg-indigo-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <UserRound size={24} className="text-indigo-400" />
          </div>
          <DialogTitle className="text-center text-xl text-white">Welcome to DevHelper CLI</DialogTitle>
          <DialogDescription className="text-center text-slate-400">
            Sign in to access all features
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6 bg-slate-950">
            <TabsTrigger value="login" className="data-[state=active]:bg-indigo-900/30">Login</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-indigo-900/30">Sign up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your-email@example.com"
                  value={authData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={authData.password}
                  onChange={handleInputChange}
                  required
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-indigo-800 hover:bg-indigo-900"
                disabled={loading}
              >
                {loading ? (
                  "Signing in..."
                ) : (
                  <>
                    <LogIn size={16} className="mr-2" />
                    Sign in
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-email" className="text-slate-300">Email</Label>
                <Input
                  id="signup-email"
                  name="email"
                  type="email"
                  placeholder="your-email@example.com"
                  value={authData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="signup-password" className="text-slate-300">Password</Label>
                <Input
                  id="signup-password"
                  name="password"
                  type="password"
                  value={authData.password}
                  onChange={handleInputChange}
                  required
                  className="bg-slate-950 border-slate-800 text-white"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-indigo-800 hover:bg-indigo-900"
                disabled={loading}
              >
                {loading ? (
                  "Creating account..."
                ) : (
                  "Create account"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModals;
