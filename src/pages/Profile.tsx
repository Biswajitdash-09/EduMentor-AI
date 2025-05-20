
import { useState, useEffect, useRef } from "react";
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
import { Loader2, Upload } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

const Profile = () => {
  const { user, profile, loading, updateProfile } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
      await updateProfile({
        first_name: firstName,
        last_name: lastName,
        updated_at: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error('Error in component when updating profile:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    setIsUploading(true);
    try {
      // Check if the storage bucket exists, create it if it doesn't
      const { data: bucketData } = await supabase.storage.getBucket('avatars');
      if (!bucketData) {
        // Create the bucket if it doesn't exist
        await supabase.storage.createBucket('avatars', {
          public: true
        });
      }

      // Upload the file
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${uuidv4()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          upsert: true
        });
        
      if (uploadError) throw uploadError;

      // Get the public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
        
      const avatarUrl = data.publicUrl;

      // Update the profile with the avatar URL
      await updateProfile({
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      });

      setAvatarUrl(avatarUrl);
      
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error uploading avatar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
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

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarUpload}
                accept="image/*"
                className="hidden"
              />
              
              <Button 
                variant="outline" 
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Avatar
                  </>
                )}
              </Button>
              <p className="text-xs text-gray-500 text-center">
                Supported formats: JPG, PNG, GIF (max 2MB)
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
