const mongoose = require("mongoose");
var Float = require('mongoose-float').loadType(mongoose);
/**
 * Schema de una Tarea
 */
const platosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Float,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true,
    },
    extension: {
        type: String,
        required: true,
    }
});

/**
 * Generación del modelo Tarea a partir del schema 
 */
const Platos = mongoose.model("Platos", platosSchema);


module.exports = Platos;