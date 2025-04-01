import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Mail, Lock, User, ChevronRight, Leaf, TreePine } from "lucide-react";

const Authentication = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      await signup(formData.email, formData.password, formData.name);
      toast({
        title: "Account created",
        description: "Please log in with your new account.",
      });
      setActiveTab("login");
      setFormData({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Please try again with different credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-400 to-green-600 text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-8">
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
              <img src="nss.png" alt="NSS Logo" className="h-16 w-16 object-contain" />
            </div>
            <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
              <img src="cmr.jpeg" alt="CMRIT Logo" className="h-16 w-16 object-contain" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-6">Welcome to GrowMate</h1>
          <p className="text-lg text-white/90 mb-8 max-w-md">
            NSS CMRIT's Plant Care Initiative helps you track and nurture your plants while contributing to a greener future.
          </p>
          <Button 
            variant="outline" 
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-full px-6"
            onClick={() => setShowDialog(true)}
          >
            Know More
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4">
          <div className="w-64 h-64 rounded-full border-[40px] border-white/20"></div>
        </div>
        <div className="absolute -left-12 top-1/2 transform -translate-y-1/2">
          <div className="w-48 h-48 rounded-full border-[30px] border-white/10"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute top-20 right-20 animate-float-slow">
          <Leaf className="h-12 w-12 text-white/20" />
        </div>
        <div className="absolute bottom-32 left-20 animate-float-slower">
          <TreePine className="h-16 w-16 text-white/20" />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        {/* Decorative Plant Image */}
        <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20 pointer-events-none select-none">
          <img
            src="/decorative-plant.png"
            alt=""
            className="w-full h-full object-contain"
          />
        </div>

        <div className="w-full max-w-md relative z-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {activeTab === "login" ? "Sign In" : "Create Account"}
              </h2>
              <p className="text-gray-600">
                {activeTab === "login" 
                  ? "Welcome back! Please enter your details." 
                  : "Get started with your plant care journey."}
              </p>
            </div>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-gray-700">Username</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:border-[#4285f4] focus:ring-[#4285f4]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-gray-700">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="login-password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:border-[#4285f4] focus:ring-[#4285f4]"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-green-500 hover:bg-green-600 rounded-xl text-lg font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "LOGIN"
                  )}
                </Button>

                <p className="text-center text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("signup")}
                    className="text-green-500 hover:text-green-600 font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="text-gray-700">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:border-[#4285f4] focus:ring-[#4285f4]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-gray-700">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:border-[#4285f4] focus:ring-[#4285f4]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-gray-700">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        name="password"
                        type="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:border-[#4285f4] focus:ring-[#4285f4]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password" className="text-gray-700">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-confirm-password"
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="pl-10 h-12 rounded-xl border-gray-200 focus:border-[#4285f4] focus:ring-[#4285f4]"
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 bg-green-500 hover:bg-green-600 rounded-xl text-lg font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "SIGN UP"
                  )}
                </Button>

                <p className="text-center text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("login")}
                    className="text-green-500 hover:text-green-600 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Know More Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl font-bold text-gray-900">
              <Leaf className="h-6 w-6 text-green-500 mr-2" />
              About GrowMate Plant Tracker
            </DialogTitle>
            <DialogDescription className="text-base text-gray-600 mt-4 space-y-4">
              <p>
                GrowMate is an innovative plant care initiative by NSS CMRIT, designed to help students and faculty members track and nurture their plants effectively.
              </p>
              <div className="bg-green-50 p-4 rounded-lg space-y-2">
                <h3 className="font-semibold text-green-800">Key Features:</h3>
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  <li>Track multiple plants and their growth progress</li>
                  <li>Set watering schedules and receive reminders</li>
                  <li>Record plant care activities and observations</li>
                  <li>Share your plant care journey with the community</li>
                  <li>Earn achievements for your gardening milestones</li>
                </ul>
              </div>
              <p>
                Join us in our mission to create a greener campus and contribute to environmental sustainability through mindful plant care.
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Authentication;
