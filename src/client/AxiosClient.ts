import axios from "axios";

const AxiosClient = axios.create({
  baseURL: "https://app.wewantwaste.co.uk/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    // Add auth tokens here if needed
  },
});

// Optional: Add interceptors (e.g., for auth or logging)
AxiosClient.interceptors.request.use(
  (config) => {
    // e.g., add auth token if exists
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

AxiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here
    return Promise.reject(error);
  }
);

export default AxiosClient;
