import { api } from "./axios-instance";
import { LoginRequest, Member } from "@/types/member";

export async function getMember(userId: string) {
  try {
    const response = await api.get<Member>(`/member/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getMemberByCookie() {
  try {
    const response = await api.get<Member>("/member/get", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function signup(loginRequest: LoginRequest) {
  const response = await api.post("/member/signup", loginRequest);
  return response.data;
}