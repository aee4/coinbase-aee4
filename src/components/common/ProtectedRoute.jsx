import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../../api/api";

function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        try {
          await api.get("/profile");
        } catch {
          await api.get("/users/profile");
        }

        if (isMounted) {
          setStatus("authenticated");
        }
      } catch {
        if (isMounted) {
          setStatus("unauthenticated");
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#0052ff] border-t-transparent"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;
