
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Save,
  Key,
  Mail,
  Palette,
  FileText,
  Globe,
  Image
} from "lucide-react";
import { motion } from "framer-motion";

const AdminSiteSettings = () => {
  const [logoUrl, setLogoUrl] = useState("/path/to/logo.png");
  const [primaryColor, setPrimaryColor] = useState("#4F46E5");
  const [emailSender, setEmailSender] = useState("noreply@edumentor.ai");
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState("");
  const [smtpUsername, setSmtpUsername] = useState("");
  const [smtpPassword, setSmtpPassword] = useState("");
  const [googleEnabled, setGoogleEnabled] = useState(true);
  const [githubEnabled, setGithubEnabled] = useState(true);
  const [emailVerification, setEmailVerification] = useState(true);

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Settings className="mr-2 h-6 w-6" />
            Site Settings
          </CardTitle>
          <CardDescription>
            Configure global settings for your education platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="branding">
            <TabsList className="mb-6">
              <TabsTrigger value="branding" className="flex items-center">
                <Palette className="mr-2 h-4 w-4" />
                Branding
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="authentication" className="flex items-center">
                <Key className="mr-2 h-4 w-4" />
                Authentication
              </TabsTrigger>
              <TabsTrigger value="general" className="flex items-center">
                <Globe className="mr-2 h-4 w-4" />
                General
              </TabsTrigger>
            </TabsList>

            <TabsContent value="branding" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="logo">Site Logo</Label>
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-md border bg-gray-100 flex items-center justify-center overflow-hidden">
                    <Image className="h-6 w-6 text-gray-400" />
                  </div>
                  <Button variant="outline">Upload New Logo</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex space-x-2">
                    <div
                      className="h-10 w-10 rounded-md border"
                      style={{ backgroundColor: primaryColor }}
                    ></div>
                    <Input
                      id="primary-color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input id="site-name" defaultValue="EduMentor AI" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="favicon">Favicon</Label>
                  <Button variant="outline" className="w-full">Upload Favicon</Button>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="footer-text">Footer Text</Label>
                  <Input id="footer-text" defaultValue="© 2025 EduMentor AI. All rights reserved." />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="email" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email-sender">Email Sender</Label>
                <Input 
                  id="email-sender" 
                  value={emailSender} 
                  onChange={(e) => setEmailSender(e.target.value)} 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input 
                    id="smtp-host" 
                    value={smtpHost} 
                    onChange={(e) => setSmtpHost(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input 
                    id="smtp-port" 
                    value={smtpPort} 
                    onChange={(e) => setSmtpPort(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp-username">SMTP Username</Label>
                  <Input 
                    id="smtp-username" 
                    value={smtpUsername} 
                    onChange={(e) => setSmtpUsername(e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">SMTP Password</Label>
                  <Input 
                    id="smtp-password" 
                    type="password" 
                    value={smtpPassword} 
                    onChange={(e) => setSmtpPassword(e.target.value)} 
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Templates</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Welcome Email</CardTitle>
                    </CardHeader>
                    <CardFooter>
                      <Button size="sm" variant="ghost" className="w-full">
                        <FileText className="mr-2 h-4 w-4" /> Edit Template
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Password Reset</CardTitle>
                    </CardHeader>
                    <CardFooter>
                      <Button size="sm" variant="ghost" className="w-full">
                        <FileText className="mr-2 h-4 w-4" /> Edit Template
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Verification Email</CardTitle>
                    </CardHeader>
                    <CardFooter>
                      <Button size="sm" variant="ghost" className="w-full">
                        <FileText className="mr-2 h-4 w-4" /> Edit Template
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="authentication" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Auth Providers</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Google Sign-In</h4>
                      <p className="text-sm text-gray-500">Allow users to sign in with Google</p>
                    </div>
                    <Switch 
                      checked={googleEnabled} 
                      onCheckedChange={setGoogleEnabled} 
                    />
                  </div>
                  
                  {googleEnabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 border-l-2 border-gray-200">
                      <div className="space-y-2">
                        <Label htmlFor="google-client-id">Client ID</Label>
                        <Input id="google-client-id" placeholder="Enter Google Client ID" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="google-client-secret">Client Secret</Label>
                        <Input id="google-client-secret" type="password" placeholder="Enter Google Client Secret" />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">GitHub Sign-In</h4>
                      <p className="text-sm text-gray-500">Allow users to sign in with GitHub</p>
                    </div>
                    <Switch 
                      checked={githubEnabled} 
                      onCheckedChange={setGithubEnabled} 
                    />
                  </div>
                  
                  {githubEnabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 border-l-2 border-gray-200">
                      <div className="space-y-2">
                        <Label htmlFor="github-client-id">Client ID</Label>
                        <Input id="github-client-id" placeholder="Enter GitHub Client ID" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="github-client-secret">Client Secret</Label>
                        <Input id="github-client-secret" type="password" placeholder="Enter GitHub Client Secret" />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4 pt-2">
                  <h3 className="text-lg font-medium">Authentication Settings</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h4 className="font-medium">Email Verification</h4>
                      <p className="text-sm text-gray-500">Require email verification before login</p>
                    </div>
                    <Switch 
                      checked={emailVerification} 
                      onCheckedChange={setEmailVerification} 
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="general" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="site-url">Site URL</Label>
                  <Input id="site-url" defaultValue="https://edumentor.ai" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <select
                    id="timezone"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                <div className="flex items-center space-x-2">
                  <Switch id="maintenance-mode" />
                  <Label htmlFor="maintenance-mode">Enable Maintenance Mode</Label>
                </div>
                <p className="text-sm text-gray-500">
                  When enabled, users will see a maintenance page when accessing the site.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button className="bg-edu-blue hover:bg-edu-blue-dark">
            <Save className="mr-2 h-4 w-4" /> Save Settings
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AdminSiteSettings;
