import { Navigate } from "react-router-dom";
import { hasAuthSession } from "../../utils/auth";

function ProtectedRoute({ children }) {
  if (!hasAuthSession()) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;
