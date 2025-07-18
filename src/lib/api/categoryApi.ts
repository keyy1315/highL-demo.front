import { tryCatch } from "../utils";
import axios from "axios";

export async function getCategories() {
  return tryCatch(async () => {
    const response = await axios.get("/api/category", {
      withCredentials: true,
    });
    return response.data;
  });
}