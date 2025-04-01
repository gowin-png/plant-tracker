import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import { checkAuth } from "./utils/authUtils";
import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";
import PlantEntryForm from "./pages/PlantEntryForm";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuth = await checkAuth();
      setIsAuthenticated(isAuth);
    };
    
    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    // Still checking authentication
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

const App = () => {
  const [initialAuthCheck, setInitialAuthCheck] = useState<boolean | null>(null);
  
  useEffect(() => {
    const initialCheck = async () => {
      const isAuth = await checkAuth();
      setInitialAuthCheck(isAuth);
    };
    initialCheck();
  }, []);

  if (initialAuthCheck === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={initialAuthCheck ? <Navigate to="/dashboard" /> : <Authentication />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/add-plant" 
                element={
                  <ProtectedRoute>
                    <PlantEntryForm />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
