import axios from "axios";
import { tryCatch } from "../utils";

export async function getCategories() {
  return tryCatch(async () => {
    const response = await axios.get("/api/category", {
      withCredentials: true,
    });
    return response.data;
  });
}