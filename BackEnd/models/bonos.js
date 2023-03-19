const mongoose = require("mongoose");
var Float = require('mongoose-float').loadType(mongoose);
/**
 * Schema de una Tarea
 */
const BonosSchema = new mongoose.Schema({
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
    }
});

/**
 * Generación del modelo Tarea a partir del schema 
 */
const Bonos = mongoose.model("Bonos", BonosSchema);


module.exports = Bonos;