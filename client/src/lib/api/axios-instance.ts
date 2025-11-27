import axios from "axios";

const baseURL =
  import.meta.env.MODE === "production" ? import.meta.env.VITE_API_URL : "/api";

if (import.meta.env.MODE === "production" && !import.meta.env.VITE_API_URL) {
  throw new Error("VITE_API_URL must be defined in production");
}

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});
