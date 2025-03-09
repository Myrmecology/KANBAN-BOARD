import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Auth from "../utils/auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  
  // Check authentication on component mount and set up interval check
  useEffect(() => {
    // Set up interval to periodically check token expiration
    const checkTokenInterval = setInterval(() => {
      if (!Auth.loggedIn()) {
        // Redirect to login if token is expired or missing
        window.location.assign('/login');
      }
    }, 60000); // Check every minute
    
    // Clean up interval on component unmount
    return () => clearInterval(checkTokenInterval);
  }, []);
  
  // Immediate check when component renders
  if (!Auth.loggedIn()) {
    // Redirect to login page if not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // If logged in, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;