const x = require("../models/x.model");
const dbConn = require("../config/db.config");
/**
 * Modelo base
 * 
 */
const X = [

]

try {
    dbConn.conectar;
    x.insertMany(X)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
} catch (err) {
    console.log("Error al conectar con la base de datos");
}