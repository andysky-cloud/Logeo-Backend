let mysql = require("mysql2");

let conectar = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1089349021",
    database: "Login"
});

conectar.connect((error) => {
    if (error) {
        console.log("Error conexion bd", error);
    } else {
        console.log("Conexion realizada");
    }
});

module.exports = conectar;