import { LoginRequest, Member } from "@/types/member";
import axios from "axios";

const tryCatch = async (fn: () => Promise<any>) => {
  try {
    return await fn();
  } catch (error) {
    throw error;
  }
};

export async function getMember(userId: string) {
  return tryCatch(async () => {
    const response = await axios.get<Member>(`api/member/${userId}`);
    return response.data;
  });
}

export async function getMemberByToken() {
  return tryCatch(async () => {
    const response = await axios.get<Member>("api/member/get");
    return response.data;
  });
}

export async function signup(loginRequest: LoginRequest) {
  return tryCatch(async () => {
    const response = await axios.post("api/member/signup", loginRequest);
    return response.data;
  });
}
