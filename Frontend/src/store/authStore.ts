import { create } from "zustand";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import { login, register } from "../api/auth";

interface User {
  nombre: string;
  avatar: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loginUser: (usuario: string, password: string) => Promise<void>;
  registerUser: (
    nombre: string,
    usuario: string,
    dni: string,
    password: string,
    avatar: string
  ) => Promise<void>;
  logoutUser: () => void;
}

const cookies = new Cookies();

export const useAuthStore = create<AuthState>((set) => {
  const token = cookies.get("jwt");

  let initialUser = null;
  let initialAuth = false;

  if (token) {
    try {
      const decoded: { nombre: string; avatar: string } = jwtDecode(token);
      initialUser = { nombre: decoded.nombre, avatar: decoded.avatar };
      initialAuth = true;
    } catch (error) {
      console.error("Token inválido:", error);
      cookies.remove("jwt");
    }
  }

  return {
    user: initialUser,
    isAuthenticated: initialAuth,

    loginUser: async (usuario, password) => {
      try {
        await login(usuario, password);
        const token = cookies.get("jwt");
        if (token) {
          const decoded: { nombre: string; avatar: string } = jwtDecode(token);
          set({
            user: { nombre: decoded.nombre, avatar: decoded.avatar },
            isAuthenticated: true,
          });
        } else {
          throw new Error("No se pudo encontrar el token en la cookie.");
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw error;
      }
    },

    registerUser: async (nombre, usuario, dni, password, avatar) => {
      const rpt = await register(nombre, usuario, dni, password, avatar);
      if (rpt) {
        console.log("Usuario registrado correctamente.");
        setTimeout(async () => {
          await useAuthStore.getState().loginUser(usuario, password);
        }, 1000);
      } else {
        console.log("Error al crear usuario");
        alert("Error al crear");
      }
    },

    logoutUser: () => {
      set({ user: null, isAuthenticated: false });
      cookies.remove("jwt");
    },
  };
});
