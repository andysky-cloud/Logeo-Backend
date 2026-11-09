let conectar = require("../conexion/bd");
let bcrypt = require("bcryptjs");

class UsuariosController {

    async registrar(req, res) {

        let { nombre, correo, contrasena, rol_id } = req.body;

        if (!nombre || !correo || !contrasena) {
            return res.status(400).json({
                mensaje: "Todos los campos son obligatorios"
            });
        }

        let contrasenaEncriptada = await bcrypt.hash(contrasena, 10);

        let sql = "INSERT INTO Usuario (nombre, correo, contrasena, rol_id) VALUES (?, ?, ?, ?)";

        conectar.query(sql, [nombre, correo, contrasenaEncriptada, rol_id], (error, resultado) => {

            if (error) {
                return res.status(500).json({
                    mensaje: "Error al registrar el usuario",
                    error: error
                });
            }

            res.json({
                mensaje: "Usuario registrado correctamente",
                id: resultado.insertId
            });

        });

    }

    async login(req, res) {

        let { correo, contrasena } = req.body;

        if (!correo || !contrasena) {
            return res.status(400).json({
                mensaje: "El correo y la contraseña son obligatorios"
            });
        }

        let sql = "SELECT * FROM Usuario WHERE correo = ?";

        conectar.query(sql, [correo], async (error, resultado) => {

            if (error) {
                return res.status(500).json({
                    mensaje: "Error al iniciar sesión"
                });
            }

            if (resultado.length === 0) {
                return res.status(401).json({
                    mensaje: "El usuario no existe"
                });
            }

            let usuario = resultado[0];

            let validarContrasena = await bcrypt.compare(
                contrasena,
                usuario.contrasena
            );

            if (!validarContrasena) {
                return res.status(401).json({
                    mensaje: "Contraseña incorrecta"
                });
            }

            res.json({
                mensaje: "Inicio de sesión exitoso",
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    correo: usuario.correo,
                    rol_id: usuario.rol_id
                }
            });

        });

    }
    listar(req, res) {
    let sql = "SELECT id, nombre, correo, rol_id FROM Usuario";

    conectar.query(sql, (error, resultado) => {
        if (error) {
            return res.status(500).json({
                mensaje: "Error al consultar los usuarios",
                error: error
            });
        }

        res.json({
            mensaje: "Lista de usuarios",
            usuarios: resultado
        });
    });
}
actualizar(req, res) {
    let id = req.params.id;
    let { nombre, correo, rol_id } = req.body;

    let sql = "UPDATE Usuario SET nombre = ?, correo = ?, rol_id = ? WHERE id = ?";

    conectar.query(sql, [nombre, correo, rol_id, id], (error, resultado) => {
        if (error) {
            return res.status(500).json({
                mensaje: "Error al actualizar el usuario",
                error: error
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "No se encontro el usuario"
            });
        }

        res.json({
            mensaje: "Usuario actualizado correctamente"
        });
    });
}
actualizar(req, res) {
    let id = req.params.id;
    let { nombre, correo, rol_id } = req.body;

    let sql = "UPDATE Usuario SET nombre = ?, correo = ?, rol_id = ? WHERE id = ?";

    conectar.query(sql, [nombre, correo, rol_id, id], (error, resultado) => {
        if (error) {
            return res.status(500).json({
                mensaje: "Error al actualizar el usuario",
                error: error
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "No se encontro el usuario"
            });
        }

        res.json({
            mensaje: "Usuario actualizado correctamente"
        });
    });
}

}

module.exports = UsuariosController;