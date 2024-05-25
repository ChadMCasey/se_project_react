import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children, anonymous = false }) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
