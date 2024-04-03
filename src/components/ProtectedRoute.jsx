import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children, anonymous = false }) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;

// const location = useLocation();
// const from = location.state?.from || "/";

// if (anonymous && isLoggedIn) {
//   return <Navigate to={from} replace />;
// }
// if (!anonymous && !isLoggedIn) {
//   return <Navigate to="/login" replace state={{ from: location }} />;
// }
