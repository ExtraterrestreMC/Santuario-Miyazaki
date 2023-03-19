const mongoose = require("mongoose"); //por instalar

const dbConfig = mysql.createConnection({
    host: "127.0.0.1",
    port: 27017,
    database: "Ciber_Cafe"
})
const dbConn = {
    conectar: mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`)
}

module.exports = dbConn