import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/auth",
  withCredentials: true,
});

export const login = async (usuario: string, password: string) => {
  const response = await api.post("http://localhost:3000/auth/login", { usuario, password });
  console.log("Respuesta: ", response.data);

  return response.data;
};

export const register = async (
  nombre: string,
  usuario: string,
  password: string,
  avatar: string
) => {
  try {
    const response = await axios.post('http://localhost:3000/auth/register', {
      nombre,
      usuario,
      password,
      avatar,
    });
    return response.data;
  } catch (error) {
    console.error(error);

  }
};

export const getProtectedData = async () => {
  const response = await api.get("/protected");
  return response.data;
};
