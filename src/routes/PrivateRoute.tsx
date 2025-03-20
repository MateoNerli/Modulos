import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  allowedRoles: string[];
}

const PrivateRoute = ({ allowedRoles }: PrivateRouteProps) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
