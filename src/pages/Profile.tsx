
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const { user, profile, loading } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || "");
      setLastName(profile.last_name || "");
      setAvatarUrl(profile.avatar_url || "");
    }
    
    if (user) {
      setEmail(user.email || "");
    }
  }, [profile, user]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-edu-blue" />
        </div>
      </DashboardLayout>
    );
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) return;
    
    setIsUpdating(true);
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          last_name: lastName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
        
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-gray-500">
          Manage your account details and preferences.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter your first name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    disabled
                    className="bg-gray-100"
                  />
                  <p className="text-sm text-gray-500">
                    To change your email address, please contact support.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="userType">User Role</Label>
                  <Input
                    id="userType"
                    value={profile?.user_type ? profile.user_type.charAt(0).toUpperCase() + profile.user_type.slice(1) : "Student"}
                    disabled
                    className="bg-gray-100"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isUpdating}
                  className="bg-edu-blue hover:bg-edu-blue-dark"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Avatar</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarImage src={avatarUrl} alt={`${firstName} ${lastName}`} />
                <AvatarFallback className="text-3xl">
                  {firstName && lastName
                    ? `${firstName[0]}${lastName[0]}`
                    : user?.email?.substring(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              
              <Button variant="outline" disabled>
                Change Avatar
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Avatar upload feature coming soon
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Learning Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-4">Recent AI Tutor Questions</h3>
                <div className="space-y-2 text-gray-600">
                  <p>No recent questions yet.</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-edu-blue"
                    onClick={() => navigate("/ai-tutor")}
                  >
                    Ask a question to the AI Tutor
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-4">Assessment History</h3>
                <div className="space-y-2 text-gray-600">
                  <p>No assessment history yet.</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-edu-blue"
                    onClick={() => navigate("/assessments")}
                  >
                    Take an assessment
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="font-semibold text-xl mb-4">Learning Path</h3>
                <div className="space-y-2 text-gray-600">
                  <p>Your learning path will appear here as you complete courses and assessments.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
