import React from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

type FormData = {
  nombre: string;
  usuario: string;
  dni: string;
  password: string;
  avatar: string;
};

const Register: React.FC = () => {
  const { registerUser } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data.nombre, data.usuario, data.dni, data.password, data.avatar);
      alert("Registro exitoso");
      navigate("/protected");
    } catch (error) {
      console.error(error);
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Registro</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            {...register("nombre", { required: "El nombre es obligatorio" })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}
        </div>

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
          <label className="block text-sm font-medium text-gray-700">DNI</label>
          <input
            type="text"
            {...register("dni", {
              required: "El DNI es obligatorio",
              pattern: { value: /^[0-9]{8}$/, message: "Debe tener 8 dígitos" }
            })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.dni && <p className="text-red-500 text-sm">{errors.dni.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            {...register("password", { 
              required: "La contraseña es obligatoria", 
              minLength: { value: 6, message: "Debe tener al menos 6 caracteres" } 
            })}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Avatar (URL)</label>
          <input
            type="text"
            {...register("avatar")}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
