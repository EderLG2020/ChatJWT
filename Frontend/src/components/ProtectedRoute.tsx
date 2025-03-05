import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore"

interface ProtectedRouteProps {
    children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    console.log("Usuario autenticado:", isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/login" />;

};

export default ProtectedRoute;
