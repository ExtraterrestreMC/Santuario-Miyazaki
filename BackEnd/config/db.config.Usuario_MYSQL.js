const { connect } = require("http2")
const mysql = require("mysql") //por instalar

/**
 * Configuracion para crear conexion a la base de datos mysql
 */
const dbConfig = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ciber_cafeteria"
})

/**
 * Establecer la conxion con la base de datos una vez que se inicie el servidor
 */
dbConfig.establishConexion = function () {
    dbConfig.connect(function (err) {
        if (err) {
            console.log(err)
            process.exit(0)
        } else {
            console.log("DB MySQL Connected!")
            console.log(dbConfig.state)
        }
    })
}

/**
 * Exportamos la varible dbConfig para usarla en cualquier momento
 */
module.exports = dbConfig