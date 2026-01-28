
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building2, GraduationCap, User, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate network delay
    setTimeout(() => {
      if (email.toLowerCase().includes("teacher")) {
        router.push("/dashboard/teacher");
      } else if (email.toLowerCase().includes("dept")) {
        router.push("/dashboard/department");
      } else if (email.toLowerCase().includes("admin") || email.toLowerCase().includes("inst")) {
        router.push("/dashboard/institute");
      } else if (email.toLowerCase().includes("student")) {
        router.push("/dashboard/student");
      } else {
        setError("Invalid credentials. Please use one of the demo accounts.");
        setIsLoading(false);
      }
    }, 1000);
  };

  const setDemoCredentials = (role: 'teacher' | 'dept' | 'admin' | 'student') => {
    setPassword("password");
    if (role === 'teacher') setEmail("teacher@ims.edu");
    if (role === 'dept') setEmail("dept.admin@ims.edu");
    if (role === 'admin') setEmail("admin@ims.edu");
    if (role === 'student') setEmail("student@ims.edu");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {error && (
              <div className="text-sm text-red-500 font-medium text-center">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6">
             <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Demo Accounts
                  </span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2">
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center h-auto py-2 px-1 gap-1"
                  onClick={() => setDemoCredentials('admin')}
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-xs">Institute</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center h-auto py-2 px-1 gap-1"
                  onClick={() => setDemoCredentials('dept')}
                >
                  <Building2 className="h-4 w-4" />
                  <span className="text-xs">Dept</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center h-auto py-2 px-1 gap-1"
                  onClick={() => setDemoCredentials('teacher')}
                >
                  <User className="h-4 w-4" />
                  <span className="text-xs">Teacher</span>
                </Button>
                 <Button 
                  variant="outline" 
                  className="flex flex-col items-center h-auto py-2 px-1 gap-1"
                  onClick={() => setDemoCredentials('student')}
                >
                  <GraduationCap className="h-4 w-4" />
                  <span className="text-xs">Student</span>
                </Button>
              </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
            Protected by IMS Security
        </CardFooter>
      </Card>
    </div>
  );
}
