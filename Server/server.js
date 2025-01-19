const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);

// Habilitar CORS globalmente en Express
app.use(cors());

// Configurar Socket.IO para que acepte solicitudes desde el cliente en localhost:5173
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173', // Permitir solicitudes solo desde localhost:5173
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});

app.use(express.json());

io.on('connection', (socket) => {
  console.log('Usuario conectado');

  // Generar un ID único para el usuario
  const userId = uuidv4();

  // Enviar el ID único al cliente
  socket.emit('userId', userId);

  socket.on('sendData', (data) => {
    console.log('Recibido de mi cliente:', data);
    socket.emit('message', `Data recibida de ${data.userId}: ${JSON.stringify(data.formData)}`);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

server.listen(3001, () => {
  console.log('Server running on port 3001');
});
