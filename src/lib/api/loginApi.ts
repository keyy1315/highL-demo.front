import { api } from "./axios-instance";
import { LoginRequest } from "@/types/member";

export async function login(loginRequest: LoginRequest) {
  try {
    const response = await api.post("/login", loginRequest, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("error",error);
    throw error;
  }
}

export async function signup(loginRequest: LoginRequest) {
  const response = await api.post("/api/member/signup", loginRequest);
  return response.data;
}

export async function checkLoginStatus() {
  try {
    const response = await api.get("/auth", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    const response = await api.get("/logout", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
