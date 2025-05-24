
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { GraduationCap, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type UserType = "student" | "faculty" | "admin";

const SignIn = () => {
  const { userType } = useParams<{ userType: string }>();
  const { signIn, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Handle navigation when user is authenticated
  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);
  
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    setLoading(true);
    try {
      await signIn(values.email, values.password);
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: {
            user_type: userType || 'student',
          },
        },
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleMagicLink = async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      });
      
      if (error) throw error;
      
      toast({
        title: "Magic Link Sent",
        description: "Check your email for the login link",
      });
    } catch (error: any) {
      toast({
        title: "Failed to send magic link",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const validatedUserType: UserType = 
    userType === "student" || userType === "faculty" || userType === "admin" 
      ? userType 
      : "student";

  // Don't render the form if user is already authenticated
  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-edu-blue mx-auto"></div>
          <p className="mt-2 text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-edu-blue" />
              <span className="text-2xl font-bold edu-gradient-text">EduMentor AI</span>
            </Link>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Sign in as {validatedUserType.charAt(0).toUpperCase() + validatedUserType.slice(1)}
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="w-full bg-edu-blue hover:bg-edu-blue-dark"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("google")}
            >
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("github")}
            >
              GitHub
            </Button>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-edu-blue hover:underline"
              onClick={() => {
                const email = form.getValues("email");
                if (!email || !z.string().email().safeParse(email).success) {
                  toast({
                    title: "Invalid email",
                    description: "Please enter a valid email address for magic link",
                    variant: "destructive",
                  });
                  return;
                }
                handleMagicLink(email);
              }}
            >
              Get a magic link
            </button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-center text-sm">
            Don't have an account?{" "}
            <Link to={`/signup/${validatedUserType}`} className="text-edu-blue hover:underline">
              Sign up
            </Link>
          </div>
          {validatedUserType !== "student" && (
            <div className="text-center text-sm">
              <Link to="/signin/student" className="text-edu-purple hover:underline">
                Sign in as student instead
              </Link>
            </div>
          )}
          {validatedUserType !== "faculty" && (
            <div className="text-center text-sm">
              <Link to="/signin/faculty" className="text-edu-purple hover:underline">
                Sign in as faculty instead
              </Link>
            </div>
          )}
          {validatedUserType !== "admin" && (
            <div className="text-center text-sm">
              <Link to="/signin/admin" className="text-edu-purple hover:underline">
                Sign in as admin instead
              </Link>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
