const express = require("express");
const cookieParser = require("cookie-parser");
const passport = require("./config/passportCookie");
const authRoutes = require("./router/authRouter");
const helmet = require("helmet")
const cors = require("cors")
const http = require("http");
const verifyJWTForSocket = require("./middleware/jwtSocket")
const socketIo = require("socket.io");
require('dotenv').config()

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(helmet())
io.use(verifyJWTForSocket);
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado", socket.user);
  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.json())

app.use("/auth", authRoutes);

app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
