let express = require("express");
let app = express();

let conectar = require("./conexion/bd");

let usuariosRoutes = require("./routes/UsuariosRoutes");
let rolesRoutes = require("./routes/RolesRoutes");

const PORT = 3000;

app.use(express.json());
app.use("/api", usuariosRoutes);
app.use("/api", rolesRoutes);


app.listen(PORT, () => {
    console.log(`Servidor en ejecucion en el puerto ${PORT}`);
});
