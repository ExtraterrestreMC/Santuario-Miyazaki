const Bonos = require("../models/bonos.model");
const dbConn = require("../config/db.config.MongoDB");

/**
 * Seed de tareas para la base de datos
 */
const bonos = [{

    nombre: "Bono Estandar",
    precio: 5,
    descripcion: "Bono de 2 horas recomendado para probar nuestros dispositivos. ",

}, {

    nombre: "Bono Experto",
    precio: 10,
    descripcion: "Bono de 6 Horas, se nota que te gustamos",

}, {

    nombre: "Bono Premiun",
    precio: 20,
    descripcion: "Bono de 12 horas  con un refresco",

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