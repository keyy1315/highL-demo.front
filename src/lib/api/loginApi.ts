import axios from "axios";
import { LoginRequest } from "@/types/member";
import { tryCatch } from "../utils";

export async function login(loginRequest: LoginRequest) {
  return tryCatch(async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
      loginRequest,
      {
        withCredentials: true,
      }
    );
    return response;
  });
}

export async function logout() {
  return tryCatch(async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/logout`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  });
}
