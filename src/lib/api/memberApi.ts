import { LoginRequest, Member } from "@/types/member";
import axios from "axios";

export async function getMember(userId: string) {
  try {
    const response = await axios.get<Member>(`api/member/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}


export async function signup(loginRequest: LoginRequest) {
  const response = await axios.post("api/member/signup", loginRequest);
  return response.data;
}