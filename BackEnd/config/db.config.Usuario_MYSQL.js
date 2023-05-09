const { log } = require("console")
const { connect } = require("http2")
const mysql = require("mysql") //por instalar
require('dotenv').config()
/**
 * Configuracion para crear conexion a la base de datos mysql
 */
const dbConfig = mysql.createConnection({
    // host: "localhost",
    // user: "root",
    // password: "",
    // database: "ciber_cafeteria"
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
//console.log(dbConfig);;
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
            console.log(dbConfig);
            console.log(dbConfig.state)
        }
    })
}

/**
 * Exportamos la varible dbConfig para usarla en cualquier momento
 */
module.exports = dbConfig