import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { LogIn, UserRound } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

const Auth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, register, loading, error } = useAuth();
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
      navigate('/');
    } catch (err) {
      toast({
        title: "Login Failed",
        description: error || "An error occurred during login",
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
      navigate('/');
    } catch (err) {
      toast({
        title: "Registration Failed",
        description: error || "An error occurred during registration",
        variant: "destructive",
        duration: 3000
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-black border-slate-800">
        <CardHeader className="text-center">
          <div className="mx-auto p-2 bg-indigo-900/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <UserRound size={24} className="text-indigo-400" />
          </div>
          <CardTitle className="text-2xl text-white">Welcome to DevHelper CLI</CardTitle>
          <CardDescription className="text-slate-400">Sign in to access all features</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
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
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-slate-400">
          <Button 
            variant="link" 
            onClick={() => navigate('/')} 
            className="text-indigo-400"
          >
            Back to home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
