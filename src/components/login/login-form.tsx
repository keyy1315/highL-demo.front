"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAuthFormStore } from "@/stores/useAuthFormStore";
import { Button } from "../ui/button";
import { login } from "@/lib/api/loginApi";
import { signup } from "@/lib/api/memberApi";
import { useErrorStore } from "@/stores/useErrorStore";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { form, setField, resetForm } = useAuthFormStore();
  const showError = useErrorStore.getState().showError;
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignUp) {
      await signup(form);
      showError("회원가입이 완료되었습니다.", "SUCCESS");
      setIsSignUp(false);
      resetForm();
    } else {
      try {
        await login(form);
        router.push("/");
      } catch {
        showError("로그인에 실패했습니다.", "ERROR");
      }
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
              onChange={(e) => setField("userId", e.target.value)}
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
              onChange={(e) => setField("password", e.target.value)}
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
