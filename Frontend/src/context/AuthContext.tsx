import React, { createContext, useContext, useState } from "react";
import { login, register } from "../api/auth";
import Cookiess from 'universal-cookie';
import { jwtDecode } from "jwt-decode";

interface User {
    nombre: string;
    avatar: string;
}
interface AuthContextProps {
    user: User | null;
    isAuthenticated: boolean;
    loginUser: (usuario: string, password: string) => Promise<void>;
    registerUser: (nombre: string, usuario: string, password: string, avatar: string) => Promise<void>;
    logoutUser: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);

    const cookies = new Cookiess();
    const loginUser = async (usuario: string, password: string) => {
        try {
            await login(usuario, password);
            const token = cookies.get("jwt");
            if (token) {
                const decoded: { nombre: string; avatar: string } = jwtDecode(token);
                localStorage.setItem("user", JSON.stringify({ nombre: decoded.nombre, avatar: decoded.avatar }));
                setUser({ nombre: decoded.nombre, avatar: decoded.avatar });
            } else {
                throw new Error("No se pudo encontrar el token en la cookie.");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            throw error;
        }
    };


    const registerUser = async (nombre: string, usuario: string, password: string, avatar: string) => {
        const rpt = await register(nombre, usuario, password, avatar);
        if (rpt) {
            console.log("Usuario registrado correctamente, esperando antes de iniciar sesión...");
            setTimeout(async () => {
                await loginUser(usuario, password);
            }, 1000);
        } else {
            console.log("Error al crear usuario");
            alert("Error al crear");
        }
    };

    const logoutUser = () => {
        setUser(null);
        cookies.remove("jwt");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                loginUser,
                registerUser,
                logoutUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
