import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
    const { registerUser } = useAuth();
    const [nombre, setNombre] = useState("");
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await registerUser(nombre, usuario, password, avatar);
            alert("Registro exitoso");
            navigate("/protected");
        } catch (error) {
            console.error(error);
            setError("Error al registrar usuario");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <input
                type="text"
                placeholder="Usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="avatar"
                placeholder="avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
            />
            <button type="submit">Registrarse</button>
            {error && <p>{error}</p>}
        </form>
    );
};

export default Register;
