import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  // Get token from localStorage
  const token = localStorage.getItem("accessToken");

  // If token is not available, redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If token exists, render protected component
  return children;
}

export default ProtectedRoute;