const jwt = require("jsonwebtoken");

const verifyJWTForSocket = (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Token no proporcionado"));
  }

  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err) {
      return next(new Error("Token no válido"));
    }
    socket.user = decoded;
    next();
  });
};

module.exports = { verifyJWTForSocket };
