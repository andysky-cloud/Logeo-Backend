let express = require("express");

let router = express.Router();

let UsuariosController = require("../controllers/UsuariosController");

let usuarios = new UsuariosController();

router.post("/register", usuarios.registrar.bind(usuarios));

router.post("/login", usuarios.login.bind(usuarios));

router.get("/usuarios", usuarios.listar.bind(usuarios));

router.put("/usuarios/:id", usuarios.actualizar.bind(usuarios));

module.exports = router;