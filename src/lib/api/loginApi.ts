"use client";

import axios from "axios";
import { LoginRequest } from "@/types/member";

export async function login(loginRequest: LoginRequest) {
  try {
    const response = await axios.post("/api/login", loginRequest, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    console.log("error",error);
    throw error;
  }
}

export async function checkLoginStatus() {
  try {
    const response = await axios.get("/auth", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    const response = await axios.get("/logout", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
