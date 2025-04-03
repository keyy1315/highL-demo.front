"use client";

import Header from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useErrorStore } from "@/stores/useErrorStore";

export default function LoginPage() {
  const { login, signup, loading, error, resetState, isLoggedIn } = useAuthStore();
  const [isSignUp, setIsSignUp] = useState(false);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const showError = useErrorStore.getState().showError;

  useEffect(() => {
    if (error || loading) {
      resetState();
    }
  }, [error, loading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUp) {
      await signup(userId, password);
      showError("회원가입이 완료되었습니다.", "SUCCESS");
      setIsSignUp(false);
      resetState();
    } else {
      login(userId, password);
      if(!error) {
        router.push("/");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto w-full max-w-7xl md:px-3 py-8">
        <div className="h-[calc(100vh-4rem)] flex items-center justify-center -mt-16">
          <Card className="w-full max-w-[600px]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold text-center">
                {isSignUp ? "SIGN UP" : "LOGIN"}
              </CardTitle>
              <CardDescription>
                {isSignUp
                  ? "Create your new account"
                  : "Enter your ID and Password to access your account"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="id">ID</Label>
                  <Input
                    id="userId"
                    type="text"
                    placeholder="Enter your ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading
                    ? isSignUp
                      ? "Signing up..."
                      : "Logging in..."
                    : isSignUp
                    ? "Sign Up"
                    : "Login"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button
                variant="link"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-muted-foreground"
              >
                {isSignUp
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign up"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
