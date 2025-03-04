import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormData = {
  usuario: string;
  password: string;
};

const Login: React.FC = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await loginUser(data.usuario, data.password);
      toast.success("Inicio de sesión exitoso", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/protected");
    } catch (error) {
      console.error(error);
      toast.error("Error al iniciar sesión", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Iniciar Sesión</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Usuario</label>
          <input
            type="text"
            {...register("usuario", { required: "El usuario es obligatorio" })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.usuario && <p className="text-red-500 text-sm">{errors.usuario.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            {...register("password", { required: "La contraseña es obligatoria" })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
