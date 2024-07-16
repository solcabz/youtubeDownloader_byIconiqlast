import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../services/cookieService";

const ProtectedRoute = () => {
  const token = getCookie("token");
  let auth = { token: token };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};
export default ProtectedRoute;
