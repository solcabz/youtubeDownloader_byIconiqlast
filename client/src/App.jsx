import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

//components
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Video from "./components/Video";
import Music from "./components/Music";
import ProtectedRoute from "./components/ProtectedRoute"; // Import your ProtectedRoute component
import UserProfile from "./components/adminFolder/UserProfile";
import UserList from "./components/adminFolder/UserList";
import "./App.css";

const App = () => {
  useEffect(() => {
    const checkCookies = () => {
      const token = Cookies.get("token");
      const userRole = Cookies.get("userRole");
      if (!token || !userRole) {
        window.location.reload();
      }
    };

    // Check cookies every 10 seconds
    const interval = setInterval(checkCookies, 10 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <div className="h-screen content-center">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/audio" element={<Music />} />
            <Route path="/" element={<Video />} />
            <Route path="/all-users" element={<UserList />}></Route>
            <Route path="/user-profile" element={<UserProfile />}></Route>
          </Route>
          <Route element={<ProtectedRoute />}></Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
