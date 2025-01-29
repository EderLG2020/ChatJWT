const express = require("express");
const { login, register } = require("../controller/authController");
const passport = require("passport");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: `Bienvenido, ${req.user.nombre}` });
  }
);

module.exports = router;
