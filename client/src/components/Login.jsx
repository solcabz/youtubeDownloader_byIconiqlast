// Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../services/cookieService"; // Adjust the path according to your project structure
import api from "../services/api"; // Adjust the path according to your project structure

import Iconiq from "../assets/Iconiqlast.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        "https://youtubedownloader-byiconiqlast.onrender.com/auth/login",
        {
          username,
          password,
        }
      );

      // Store token in cookie
      setCookie("token", response.data.token, { expires: 1 }); // Token expires in 1 day
      // Optionally, store user role in cookie if needed
      setCookie("userRole", response.data.user.role, { expires: 1 }); // User role expires in 1 day
      console.log("Logged in successfully!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid username or password"); // Set error message for display
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-9 ">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-stone-900 p-6 rounded-lg shadow-stone-700 shadow-xl text-white"
      >
        <div className="flex justify-center gap-10">
          <img src={Iconiq} alt="" />
        </div>
        <div className="mb-6">
          <label htmlFor="input-text1" className="block text-sm font-medium ">
            Username
          </label>
          <input
            id="input-text1"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border text-stone-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="input-text2" className="block text-sm font-medium ">
            Password:
          </label>
          <input
            id="input-text2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border text-stone-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-amber-500 text-white py-2 px-4 rounded-md hover:bg-orange-500 focus:outline-none "
        >
          Login
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
