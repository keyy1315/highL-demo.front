import { LoginRequest, Member } from "@/types/member";
import axios from "axios";
import { tryCatch } from "../utils";

export async function getMember(userId: string) {
  return tryCatch(async () => {
    const response = await axios.get<Member>(`${process.env.NEXT_PUBLIC_API_URL}/api/member/${userId}`, {
      withCredentials: true,
    });
    return response.data;
  });
}

export async function getMemberByToken(cookieHeader?: string) {
  return tryCatch(async () => {
    const response = await axios.get<Member>(`${process.env.NEXT_PUBLIC_API_URL}/api/member/get`, {
      withCredentials: true,
      headers: {
        Cookie: cookieHeader,
      },
    });
    return response.data;
  });
}

export async function signup(loginRequest: LoginRequest) {
  return tryCatch(async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/member/signup`,
      loginRequest
    );
    return response.data;
  });
}
