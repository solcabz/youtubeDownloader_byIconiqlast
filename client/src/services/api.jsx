// services/api.js
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create an axios instance
const api = axios.create({
  baseURL: "https://servericoniq-solcabzs-projects.vercel.app", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios interceptor for handling token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "TokenExpired"
    ) {
      // Token has expired, handle logout and redirect
      localStorage.removeItem("token"); // Remove token from storage
      localStorage.removeItem("userRole"); // Remove user role

      // Using useNavigate for navigation
      const navigate = useNavigate();
      navigate("/login"); // Redirect to login page
      window.location.reload(); // Reload the page to apply changes
    }
    return Promise.reject(error);
  }
);

export default api;
