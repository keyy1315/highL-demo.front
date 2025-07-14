"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signup } from "@/lib/api/memberApi";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

export default function LoginForm() {
  const { login } = useAuthStore();

  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({
    userId: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUp) {
      await signup(form);
      setIsSignUp(false);
      setForm({
        userId: "",
        password: "",
      });
    } else {
      try {
        await login(form.userId, form.password);
        router.push("/");
      } catch {}
    }
  };

  return (
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
              value={form.userId}
              onChange={(e) => setForm({ ...form, userId: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {isSignUp ? "Sign Up" : "Login"}
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
  );
}
