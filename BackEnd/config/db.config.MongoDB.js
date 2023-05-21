const mongoose = require("mongoose");
//const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
/***
 * Configuracion de la base datos de MONGODB 
 */
const dbConfig = {
    host: process.env.MONGODB_URL,
    port: process.env.PORT,
    database: process.env.DB_NAME_MDB
}
//const url = process.env.MONGODB_URL;
//const dbName = process.env.DB_NAME_MDB;
//console.log(dbConfig);

/**
 * Conectar a la base de datos de MongoDB
 */
const dbConn = {
    //conectar: mongoose.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`)
    conectar: mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("contectado a MongoDB Atlas"))
        .catch((error) => console.log(error))
}

module.exports = dbConn