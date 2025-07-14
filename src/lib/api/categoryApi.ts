import axios from "axios";

export async function getCategories() {
  const response = await axios.get("/api/category", {
    withCredentials: true,
  });
  return response.data;
}