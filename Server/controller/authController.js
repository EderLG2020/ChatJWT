const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userList, addUser } = require("../config/db");
const { v4 } = require("uuid");
require('dotenv').config()

const JWT_SECRET = process.env.SECRET_KEY;
const JWT_EXPIRES_IN = "1h";

async function login(req, res) {
  const { usuario, password } = req.body;

  const user = userList.find((u) => u.usuario === usuario);
  if (!user) {
    return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Usuario o contraseña incorrectos" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      nombre: user.nombre,
      usuario: user.usuario,
      avatar: user.avatar
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  res.cookie("jwt", token, {
    httpOnly: false,
    maxAge: 3600000,
  });

  return res.json({ message: "Inicio de sesión exitoso" });
}

async function register(req, res) {
  const { nombre, usuario, password, avatar } = req.body;
  const users = userList;
  if (users.some((u) => u.usuario === usuario)) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  const passhash = await bcrypt.hash(password, 5);

  const newUser = {
    id: v4(),
    nombre,
    usuario,
    password: passhash,
    avatar,
  };

  addUser(newUser);
console.log(JWT_SECRET);

  const token = jwt.sign(
    { id: newUser.id, nombre: newUser.nombre, usuario: newUser.usuario },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600000,
  });

  return res.status(201).json({ message: "Registro exitoso" });
}


module.exports = {
  login,
  register,
};
