let conectar = require("../conexion/bd");

class RolesController {

    listar(req, res) {
        let sql = "SELECT * FROM Rol";

        conectar.query(sql, (error, resultado) => {
            if (error) {
                return res.status(500).json({
                    mensaje: "Error al consultar los roles",
                    error: error
                });
            }

            res.json({
                mensaje: "Lista de roles",
                roles: resultado
            });
        });
    }

    insertar(req, res) {
        let { nombre } = req.body;

        if (!nombre) {
            return res.status(400).json({
                mensaje: "El nombre del rol es obligatorio"
            });
        }

        let sql = "INSERT INTO Rol (nombre) VALUES (?)";

        conectar.query(sql, [nombre], (error, resultado) => {
            if (error) {
                return res.status(500).json({
                    mensaje: "Error al insertar el rol",
                    error: error
                });
            }

            res.json({
                mensaje: "Rol insertado correctamente",
                id: resultado.insertId
            });
        });
    }

    actualizar(req, res) {
        let id = req.params.id;
        let { nombre } = req.body;

        let sql = "UPDATE Rol SET nombre = ? WHERE id = ?";

        conectar.query(sql, [nombre, id], (error, resultado) => {
            if (error) {
                return res.status(500).json({
                    mensaje: "Error al actualizar el rol",
                    error: error
                });
            }

            if (resultado.affectedRows === 0) {
                return res.status(404).json({
                    mensaje: "No se encontro el rol"
                });
            }

            res.json({
                mensaje: "Rol actualizado correctamente"
            });
        });
    }
    eliminar(req, res) {
    let id = req.params.id;

    let sql = "DELETE FROM Rol WHERE id = ?";

    conectar.query(sql, [id], (error, resultado) => {
        if (error) {
            return res.status(500).json({
                mensaje: "Error al eliminar el rol",
                error: error
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "No se encontro el rol"
            });
        }

        res.json({
            mensaje: "Rol eliminado correctamente"
        });
    });
}

}

module.exports = RolesController;