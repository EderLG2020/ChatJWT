import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface PublicRouteProps {
    children: React.ReactElement;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    return isAuthenticated ? <Navigate to="/messenger" /> : children;
};

export default PublicRoute;
