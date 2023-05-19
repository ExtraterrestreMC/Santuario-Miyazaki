const Platos = require("../models/platos.model");
const dbConn = require("../config/db.config.MongoDB");

/**
 * Seed de tareas para la base de datos
 */
const platos = [{
    nombre: "Pizza Peperoni",
    precio: 12,
    descripcion: "Una pizza hecha con nuestras mejores salsas",
    imagen: "64493806a949d4d60d37036c",
}, {
    nombre: "Hamburguesa triple",
    precio: 12,
    descripcion: "La mejoeres hamburguesas de toda Alicante",
    imagen: "644941cc94f48ea49196d9ce",
}, {
    nombre: "Alitas de Pollo (6)",
    precio: 5,
    descripcion: "Las mejores alitas de pollo con miel y mostaza al horno",
    imagen: "644a375955fc22d2d37a83bf",
}]

/**
 * Insertar la seed en la base de datos
 */
try {
    dbConn.conectar;
    Platos.insertMany(platos)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
} catch (err) {
    console.log("Error al conectar con la base de datos");
}
