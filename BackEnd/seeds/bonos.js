const Bonos = require("../models/bonos");
const dbConn = require("../config/db.config.mongo_Ciber");

/**
 * Seed de tareas para la base de datos
 */
const bonos = [{
    nombre: "Bono Inical",
    precio: 4.99,
    descripcion: "Bono basico del ciber"
}]

/**
 * Insertar la seed en la base de datos
 */
try {
    dbConn.conectar;
    Bonos.insertMany(bonos)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
} catch (err) {
    console.log("Error al conectar con la base de datos");
}