import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();

  const storedToken = localStorage.getItem("token");

  if (token || storedToken) {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default PrivateRoute;
