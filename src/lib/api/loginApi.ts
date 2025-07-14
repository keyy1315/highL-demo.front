import axios from "axios";
import { LoginRequest } from "@/types/member";

export async function login(loginRequest: LoginRequest) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
      loginRequest,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/logout`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getAuth() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
