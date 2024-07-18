import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../services/cookieService";

const ProtectedRoute = () => {
  const token = getCookie("token");
  const userRole = getCookie("userRole");

  // Check if token exists and user role is admin
  if (token && userRole === "admin") {
    return <Outlet />;
  } else {
    // Redirect to login or another route
    return <Navigate to="/404" />;
  }
};

export default ProtectedRoute;
