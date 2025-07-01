import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
export default function ProtectedRoute() {
  const isAuth = useSelector((state) => state.auth.userAuth);
  const checkingAuth = useSelector((state) => state.auth.checkingAuth);

  if (checkingAuth) {
    return null;
  }

  return isAuth ? <Outlet /> : <Navigate to="/home" replace />;
}
