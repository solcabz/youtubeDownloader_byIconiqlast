import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// components
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Video from "./components/Video";
import Music from "./components/Music";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./components/adminFolder/UserProfile";
import UserList from "./components/adminFolder/UserList";
import Darkmode from "./services/Darkmode";
import Unauthorized from "./components/Unauthorized";
import "./App.css";

const App = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkCookies = () => {
      const token = Cookies.get("token");
      const userRole = Cookies.get("userRole");
      if (token && userRole) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        navigate("/login");
      }
    };

    // Check cookies initially and every 10 seconds
    checkCookies();
    const interval = setInterval(checkCookies, 10 * 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <>
      <Navbar />
      {isLoggedIn && <Darkmode />}
      <div className="h-screen content-center">
        <Routes>
          <Route path="/audio" element={<Music />} />
          <Route path="/" element={<Video />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/all-users" element={<UserList />} />
          </Route>
          <Route path="*" element={<Unauthorized />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
