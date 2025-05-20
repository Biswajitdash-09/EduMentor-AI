
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Moon, Sun } from "lucide-react";

const Settings = () => {
  const { user, profile, loading } = useAuth();
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [language, setLanguage] = useState("english");
  const [theme, setTheme] = useState("light");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveSettings = () => {
    setIsSaving(true);
    
    // Simulate saving settings
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      });
    }, 1000);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-edu-blue" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-500">
          Manage your application preferences and account settings.
        </p>

        <Tabs defaultValue="preferences" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preferences">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>
                    Customize how the application looks and feels.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <div className="flex space-x-4">
                      <Button 
                        variant={theme === "light" ? "default" : "outline"} 
                        className={theme === "light" ? "bg-edu-blue" : ""}
                        onClick={() => setTheme("light")}
                      >
                        <Sun className="h-4 w-4 mr-2" />
                        Light
                      </Button>
                      <Button 
                        variant={theme === "dark" ? "default" : "outline"}
                        className={theme === "dark" ? "bg-edu-blue" : ""}
                        onClick={() => setTheme("dark")}
                      >
                        <Moon className="h-4 w-4 mr-2" />
                        Dark
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Note: Dark mode is coming in a future update.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="odia">Odia</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500 mt-1">
                      Additional languages will be available soon.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Accessibility</CardTitle>
                  <CardDescription>
                    Customize accessibility options for better experience.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="text-size">Larger Text</Label>
                      <p className="text-sm text-gray-500">
                        Increase the size of text throughout the application.
                      </p>
                    </div>
                    <Switch id="text-size" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="high-contrast">High Contrast</Label>
                      <p className="text-sm text-gray-500">
                        Enhance visual distinction between elements.
                      </p>
                    </div>
                    <Switch id="high-contrast" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="reduced-motion">Reduced Motion</Label>
                      <p className="text-sm text-gray-500">
                        Minimize animations and transitions.
                      </p>
                    </div>
                    <Switch id="reduced-motion" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive and how.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium text-lg mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="assessment-notif">Assessment Reminders</Label>
                        <p className="text-sm text-gray-500">
                          Receive reminders about upcoming or incomplete assessments.
                        </p>
                      </div>
                      <Switch 
                        id="assessment-notif" 
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="feedback-notif">Feedback Notifications</Label>
                        <p className="text-sm text-gray-500">
                          Get notified when your assessments are graded.
                        </p>
                      </div>
                      <Switch id="feedback-notif" checked={emailNotifications} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="course-notif">Course Updates</Label>
                        <p className="text-sm text-gray-500">
                          Notifications when new course materials are added.
                        </p>
                      </div>
                      <Switch id="course-notif" checked={emailNotifications} />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="ai-tutor-notif">AI Tutor Sessions</Label>
                        <p className="text-sm text-gray-500">
                          Get summaries of your AI tutor interactions.
                        </p>
                      </div>
                      <Switch id="ai-tutor-notif" checked={emailNotifications} />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-lg mb-4">System Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="browser-notif">Browser Notifications</Label>
                        <p className="text-sm text-gray-500">
                          Allow browser push notifications for important updates.
                        </p>
                      </div>
                      <Switch id="browser-notif" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>
                  Update your password and manage account security.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full md:w-auto">
                  Change Password
                </Button>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium text-lg mb-4">Connected Accounts</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="bg-[#4285F4] text-white w-6 h-6 rounded-full flex items-center justify-center">G</div>
                        <div>
                          <p className="font-medium">Google</p>
                          <p className="text-sm text-gray-500">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="bg-[#333] text-white w-6 h-6 rounded-full flex items-center justify-center">G</div>
                        <div>
                          <p className="font-medium">GitHub</p>
                          <p className="text-sm text-gray-500">Not connected</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Connect</Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium text-lg mb-4 text-red-600">Danger Zone</h3>
                  <Button variant="destructive">Delete Account</Button>
                  <p className="text-xs text-gray-500 mt-2">
                    This will permanently delete your account and all associated data.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end">
          <Button 
            onClick={handleSaveSettings} 
            disabled={isSaving}
            className="bg-edu-blue hover:bg-edu-blue-dark"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Settings"
            )}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
