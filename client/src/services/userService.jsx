// src/services/userService.js
import api from "./api";
import { getCookie } from "./cookieService";

export const getUserProfile = async (userId) => {
  try {
    const token = getCookie("token");
    const response = await api.get(`http://localhost:3000/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};
