
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  login as authLogin, 
  register as authRegister, 
  logout as authLogout, 
  getCurrentUser, 
  checkAuth 
} from '@/utils/authUtils';
import { AuthContextType, User } from '@/types';
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for existing user session
  useEffect(() => {
    const initAuth = async () => {
      try {
        const isAuth = await checkAuth();
        if (isAuth) {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      const loggedInUser = await authLogin(email, password);
      setUser(loggedInUser);
      setIsAuthenticated(true);
      navigate('/dashboard');
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      return;
    } catch (error) {
      const errorMessage = 
        error instanceof Error ? error.message : "An unknown error occurred";
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleRegister = async (name: string, email: string, password: string) => {
    try {
      const newUser = await authRegister(name, email, password);
      setUser(newUser);
      setIsAuthenticated(true);
      navigate('/dashboard');
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
      return;
    } catch (error) {
      const errorMessage = 
        error instanceof Error ? error.message : "An unknown error occurred";
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await authLogout();
      setUser(null);
      setIsAuthenticated(false);
      navigate('/');
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Logout failed",
        description: "There was an issue logging you out.",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
