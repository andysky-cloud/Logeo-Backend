let express = require("express");
let router = express.Router();

let RolesController = require("../controllers/RolesController");
let roles = new RolesController();

router.get("/roles", roles.listar.bind(roles));

router.post("/roles", roles.insertar.bind(roles));

router.put("/roles/:id", roles.actualizar.bind(roles));

router.delete("/roles/:id", roles.eliminar.bind(roles));

module.exports = router;