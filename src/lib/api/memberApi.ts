import { api } from "./axios-instance";
import { Member } from "@/types/member";

export async function getMember(userId: string) {
  try {
    const response = await api.get<Member>(`/api/member/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getMemberByCookie() {
  try {
    const response = await api.get<Member>("/api/member/get", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
