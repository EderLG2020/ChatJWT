const express = require("express");
const { encrypt, decrypt } = require("../utils/cript");

const router = express.Router();

// Middleware para verificar que el cuerpo de la solicitud tenga datos
const validateRequestData = (req, res, next) => {
  const { data, encryptedData } = req.body;
  if (req.path === "/encrypt" && !data) {
    return res.status(400).json({
      code: 400,
      status: "Error",
      message: "Missing 'data' field"
    });
  }
  if (req.path === "/decrypt" && !encryptedData) {
    return res.status(400).json({
      code: 400,
      status: "Error",
      message: "Missing 'encryptedData' field"
    });
  }
  next();
};

router.use(validateRequestData); // Aplicar validación a todas las rutas

// Ruta para encriptar
router.post("/encrypt", (req, res) => {
  const { data } = req.body;
  try {
    const encryptedData = encrypt(data);
    res.status(200).json({
      code: 200,
      status: "Success",
      encrypted: encryptedData
    });
  } catch (error) {
    console.error("Encryption Error: ", error);
    res.status(500).json({
      code: 500,
      status: "Error",
      message: error.message || "An error occurred during encryption"
    });
  }
});

// Ruta para cerrar sesión (logout)
app.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "Cierre de sesión exitoso" });
});

  

// Ruta protegida
app.get("/protected", authenticate, (req, res) => {
  res.json({ message: `Bienvenido, ${req.user.username}` });
});


// Ruta para desencriptar
router.post("/decrypt", (req, res) => {
  const { encryptedData } = req.body;
  try {
    const decryptedData = decrypt(encryptedData);
    res.status(200).json({
      code: 200,
      status: "Success",
      decrypted: decryptedData
    });
  } catch (error) {
    console.error("Decryption Error: ", error);
    res.status(500).json({
      code: 500,
      status: "Error",
      message: error.message || "An error occurred during decryption"
    });
  }
});

module.exports = router;
