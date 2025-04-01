import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/utils/authUtils";
import Navbar from "@/components/Navbar";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Leaf, Upload, Droplet, Calendar, MapPin, Info } from "lucide-react";

const PlantEntryForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const user = getCurrentUser();

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    plantedDate: new Date().toISOString().split("T")[0],
    location: "",
    notes: "",
    waterFrequency: "",
  });

  const [activeTab, setActiveTab] = useState("form");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you'd send this to your backend
    console.log("Submitted plant data:", formData);
    
    toast({
      title: "Plant added successfully!",
      description: `${formData.name} has been added to your collection.`,
    });
    
    // Navigate back to dashboard
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        <Button
          variant="ghost"
          className="mb-8 hover:bg-white/80 transition-colors"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <Card className="w-full bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-[2rem]">
          <CardHeader className="pb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-xl">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-800">Add New Plant</CardTitle>
                <CardDescription className="text-base text-gray-600">
                  Enter the details of your new plant to start tracking its growth journey
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="px-6">
              <TabsList className="grid w-full grid-cols-3 bg-gray-50/50 p-1 rounded-xl">
                <TabsTrigger value="form" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Plant Details</TabsTrigger>
                <TabsTrigger value="image-upload" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Image Upload</TabsTrigger>
                <TabsTrigger value="google-form" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Google Form</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="form">
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6 pt-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700">Plant Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="e.g. Living Room Monstera"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="species" className="text-gray-700">Species (if known)</Label>
                      <Input
                        id="species"
                        name="species"
                        placeholder="e.g. Monstera deliciosa"
                        value={formData.species}
                        onChange={handleChange}
                        className="rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="plantedDate" className="text-gray-700">Date Planted/Purchased</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="plantedDate"
                          name="plantedDate"
                          type="date"
                          value={formData.plantedDate}
                          onChange={handleChange}
                          required
                          className="pl-10 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-gray-700">Location</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="location"
                          name="location"
                          placeholder="e.g. Living Room, Balcony"
                          value={formData.location}
                          onChange={handleChange}
                          required
                          className="pl-10 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="waterFrequency" className="text-gray-700">Water Frequency (days)</Label>
                    <div className="relative">
                      <Droplet className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="waterFrequency"
                        name="waterFrequency"
                        type="number"
                        placeholder="e.g. 7"
                        value={formData.waterFrequency}
                        onChange={handleChange}
                        className="pl-10 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-gray-700">Notes</Label>
                    <div className="relative">
                      <Info className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Textarea
                        id="notes"
                        name="notes"
                        placeholder="Add any special care instructions or observations"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={4}
                        className="pl-10 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between px-6 py-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                    className="rounded-xl hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 rounded-xl px-8"
                  >
                    Save Plant
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="image-upload">
              <CardContent className="pt-6">
                <div className="text-center pb-6">
                  <div className="p-3 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload Plant Images</h3>
                  <p className="text-gray-600">
                    Visually track your plant's growth by uploading photos
                  </p>
                </div>
                
                <div className="border-2 border-dashed border-blue-200 rounded-xl p-8 text-center bg-blue-50/50">
                  <div className="flex flex-col items-center">
                    <Button className="mb-4 bg-blue-600 hover:bg-blue-700 rounded-xl">
                      <Upload className="mr-2 h-4 w-4" />
                      Select File
                    </Button>
                    <p className="text-sm text-gray-600">
                      Drag and drop files here or click to browse
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Supports JPEG, PNG images up to 10MB
                    </p>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between px-6 py-4">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("form")}
                  className="rounded-xl hover:bg-gray-50"
                >
                  Back to Details
                </Button>
                <Button
                  onClick={() => {
                    toast({
                      title: "Coming soon",
                      description: "Image upload functionality will be available soon.",
                    });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8"
                >
                  Upload Images
                </Button>
              </CardFooter>
            </TabsContent>
            
            <TabsContent value="google-form">
              <CardContent className="pt-6 pb-6">
                <div className="text-center pb-6">
                  <div className="p-3 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Google Form Integration</h3>
                  <p className="text-gray-600">
                    Use Google Forms to upload and manage plant images
                  </p>
                </div>
                
                <div className="border rounded-xl overflow-hidden shadow-sm">
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSdwWxMn0GnIu8Pmr0IqJNoBdYyQnjKCXO2gYtlT65A-q1Q-0A/viewform?embedded=true"
                    width="100%"
                    height="400"
                    title="Google Form"
                    className="border-0"
                  >
                    Loading Google Form...
                  </iframe>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    Fill out the form above to submit your plant images
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between px-6 py-4">
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab("form")}
                  className="rounded-xl hover:bg-gray-50"
                >
                  Back to Details
                </Button>
                <Button
                  onClick={() => {
                    toast({
                      title: "Form submitted",
                      description: "Your plant images have been submitted successfully.",
                    });
                  }}
                  className="bg-purple-600 hover:bg-purple-700 rounded-xl px-8"
                >
                  Submit Form
                </Button>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  );
};

export default PlantEntryForm;
