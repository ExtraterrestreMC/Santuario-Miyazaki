const { connect } = require("http2")
const mysql = require("mysql") //npm i mysql

/**
 * Configuracion para crear conexion a la base de datos mysql
 */
const dbConn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ciber_cafeteria"
})

/**
 * Establecer la conxion con la base de datos una vez que se inicie el servidor
 */
dbConn.establishConexion = function () {
    dbConn.connect(function (err) {
        if (err) {
            console.log(err)
            process.exit(0)
        } else {
            console.log("DB MySQL Connected!")
            console.log(dbConn.state)
        }
    })
}

/**
 * Exportamos la varible dbConn para usarla en cualquier momento
 */
module.exports = dbConn