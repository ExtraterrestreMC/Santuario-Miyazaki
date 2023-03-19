const Platos = require("../models/platos");
const dbConn = require("../config/db.config.mongo_Ciber");

/**
 * Seed de tareas para la base de datos
 */
const platos = [{
    nombre: "Hamburguesa",
    precio: 1.4,
    descripcion: "Hamburguesa normal",
    imagen: "https://imagenes.elpais.com/resizer/ytGV08J5knZcBHJ0xRZI5i20V0E=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/BPOVHCK5BFH4HG6VTKZ55W6SXI",
    extension: "jpeg",
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