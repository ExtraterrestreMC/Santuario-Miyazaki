const mongoose = require("mongoose");
/**
 * Schema de una Bonos
 */
const BonosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
});

/**
 * Generación del modelo Bonos a partir del schema 
 */
const Bonos = mongoose.model("Bonos", BonosSchema);

/**
 * Recoger 
 * @returns Todos los bonos
 */
Bonos.get_Bonos = async function () {
    return Bonos.find();
}

/**
 * Recoger
 * @param {id} id_bono 
 * @returns  un bono
 */
Bonos.get_bono_id = async function (id_bono) {
    return Bonos.findById(id_bono);
}

/**
 * Creacion de un bono
 * @param {datos} bono 
 * @returns bono creado
 */
Bonos.add_bono = async function (bono) {
    const nuevobono = new Bonos(bono)
    return nuevobono.save()
}

/**
 * @param {id} id_bono 
 * @param {datos} bono 
 * @returns Bono editado
 */
Bonos.edit_bono = async function (id_bono, bono) {
    return Bonos.findByIdAndUpdate(id_bono, bono, { runValidators: true, new: true, rawResult: true })
}
/**
 * @param {id} id_bono 
 * @returns bono eliminado
 */
Bonos.delete_bono = async function (id_bono) {
    return Bonos.findByIdAndDelete(id_bono)
}

module.exports = Bonos;