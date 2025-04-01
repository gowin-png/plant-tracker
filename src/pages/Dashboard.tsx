import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/utils/authUtils";
import { User, Plant } from "@/types";
import { dummyPlants } from "@/utils/dummyData";
import UserProfile from "@/components/UserProfile";
import PlantCard from "@/components/PlantCard";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus, BarChart3, Droplet, Save, Leaf, GraduationCap, Users, Calendar, Award, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [userData, setUserData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    preferredPlants: "",
    experience: ""
  });

  useEffect(() => {
    const initDashboard = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
          navigate("/");
          return;
        }

        setUser(currentUser);
        
        // In a real app, you'd fetch plants from an API
        // Simulating API fetch with a timeout
        setTimeout(() => {
          setPlants(dummyPlants);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error initializing dashboard:", error);
        setLoading(false);
      }
    };

    initDashboard();
  }, [navigate]);

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserDataSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User data submitted:", userData);
    toast({
      title: "User data saved",
      description: "Your information has been successfully recorded."
    });
    // In a real app, you would save this to Supabase
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
          <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-white rounded-[2rem] shadow-xl p-8 relative overflow-hidden border border-white/20">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <img src="nss.png" alt="NSS Logo" className="h-16 w-16 object-contain" />
                <img src="cmr.jpeg" alt="CMRIT Logo" className="h-16 w-16 object-contain" />
              </div>
              <div className="text-right">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to GrowMate</h1>
                <p className="text-gray-600 text-lg">NSS CMRIT's Plant Care Initiative</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-[1.5rem]">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-[1rem]">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Plants</p>
                  <h3 className="text-2xl font-bold text-gray-800">{plants.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-[1.5rem]">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-[1rem]">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Next Watering</p>
                  <h3 className="text-2xl font-bold text-gray-800">3 Plants</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-[1.5rem]">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-100 rounded-[1rem]">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Achievements</p>
                  <h3 className="text-2xl font-bold text-gray-800">0</h3>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-[1.5rem]">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-[1rem]">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">NSS Points</p>
                  <h3 className="text-2xl font-bold text-gray-800">0</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-[1.5rem] overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-800">Your Profile</CardTitle>
                  <CardDescription className="text-base">Your NSS CMRIT Plant Care Journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                        <Users className="h-8 w-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{user.name}</h3>
                        <p className="text-sm text-gray-600">NSS Member</p>
                      </div>
                    </div>
                    
                    {/* Certificates Section */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-800">Your Certificates</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative group">
                          <div className="absolute inset-0 bg-green-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <img 
                            src="6months.jpg" 
                            alt="1year.jpg" 
                            className="w-full h-32 object-cover rounded-xl shadow-md"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 rounded-b-xl">
                            6 Month Achievement
                          </div>
                        </div>
                        <div className="relative group">
                          <div className="absolute inset-0 bg-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <img 
                            src="1year.jpg" 
                            alt="1 Year Certificate" 
                            className="w-full h-32 object-cover rounded-xl shadow-md"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-2 rounded-b-xl">
                            1 Year Achievement
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Section */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800">Your Progress</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Plant Care Level</span>
                          <span className="font-medium text-green-600">Advanced</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Profile Card */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-[1.5rem]">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-gray-800">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start rounded-xl">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Plant Care
                    </Button>
                    <Button variant="outline" className="w-full justify-start rounded-xl">
                      <Award className="mr-2 h-4 w-4" />
                      View Achievements
                    </Button>
                    <Button variant="outline" className="w-full justify-start rounded-xl">
                      <Users className="mr-2 h-4 w-4" />
                      Join NSS Events
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Plant Management Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-xl">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Your Plants</h2>
              </div>
              <Button 
                onClick={() => navigate("/add-plant")}
                className="bg-green-600 hover:bg-green-700 rounded-xl px-6"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add New Plant
              </Button>
            </div>

            {/* Plant Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {plants.map((plant) => (
                <Card key={plant.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden group">
                  <div className="relative h-48 bg-gradient-to-br from-green-50 to-blue-50">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <img 
                      src={plant.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDOVgDKRKHcuBXKmuIw5XsK-YiDoFEP2ieEQ&s"} 
                      alt={plant.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-semibold text-white drop-shadow-lg">{plant.name}</h3>
                      <p className="text-white/90 text-sm drop-shadow-lg">{plant.species}</p>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium text-gray-800">{plant.location}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Planted Date</p>
                        <p className="font-medium text-gray-800">{new Date(plant.plantedDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">Water Frequency</p>
                        <p className="font-medium text-gray-800">{plant.waterFrequency} days</p>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full transition-all duration-300"
                          style={{ width: `${(plant.waterFrequency / 14) * 100}%` }}
                        />
                      </div>
                    </div>

                    {plant.notes && (
                      <div className="space-y-1">
                        <p className="text-sm text-gray-500">Notes</p>
                        <p className="text-sm text-gray-700 line-clamp-2">{plant.notes}</p>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="p-6 pt-0 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Droplet className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-sm text-gray-600">Next watering in 3 days</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100">
                        <Edit className="h-4 w-4 text-gray-600" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {plants.length === 0 && (
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl p-8 text-center">
                <div className="p-3 bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Plants Yet</h3>
                <p className="text-gray-600 mb-6">Start your plant care journey by adding your first plant!</p>
                <Button 
                  onClick={() => navigate("/add-plant")}
                  className="bg-green-600 hover:bg-green-700 rounded-xl px-6"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Plant
                </Button>
              </Card>
            )}
          </div>
        </div>

        {/* NSS Activities Section */}
        <div>
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-[1.5rem]">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800">NSS Activities</CardTitle>
              <CardDescription className="text-base">Upcoming plant care events and initiatives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-green-50 rounded-xl border border-green-100 hover:shadow-md transition-all duration-300">
                  <h3 className="font-semibold text-green-800 mb-3 text-lg">Weekly Plant Care Workshop</h3>
                  <p className="text-gray-600">Join us every Saturday for hands-on plant care training</p>
                </div>
                <div className="p-6 bg-blue-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
                  <h3 className="font-semibold text-blue-800 mb-3 text-lg">Campus Green Initiative</h3>
                  <p className="text-gray-600">Help us make CMRIT greener with native plants</p>
                </div>
                <div className="p-6 bg-purple-50 rounded-xl border border-purple-100 hover:shadow-md transition-all duration-300">
                  <h3 className="font-semibold text-purple-800 mb-3 text-lg">Plant Exchange Program</h3>
                  <p className="text-gray-600">Trade plants with other NSS members</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
