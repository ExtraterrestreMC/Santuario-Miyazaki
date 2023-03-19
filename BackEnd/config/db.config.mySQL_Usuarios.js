const mysql = require("mysql") //Por instalar
const mongoose = require("mongoose"); //por instalar
const dbConfig = {
    host: "127.0.0.1",
    port: 27017,
    database: "TFG"
}
dbConn.establishConexion = function() {
    dbConn.connect(function(err) {
        if (err) {
            console.log(err)
            process.exit(0)
        } else {
            console.log("DB MySQL Connected!")
            console.log(dbConn.state)
        }
    })
}

// const dbConn = {
//     conectar: mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`)
// }

module.exports = dbConn