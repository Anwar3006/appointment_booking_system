import axios from "axios";

// Create an axios instance with common configurations
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
    "X-Appwrite-Project": import.meta.env.VITE_PROJECT_ID,
    "X-Appwrite-Key": import.meta.env.VITE_API_KEY,
  },
});

export default axiosClient;
