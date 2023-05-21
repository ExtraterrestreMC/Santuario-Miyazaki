const mongoose = require("mongoose");
/**
 * Schema de una Platos
 */
const platosSchema = new mongoose.Schema({
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
    },
    imagen: {
        type: String,
        required: true
    }
});

/**
 * Generación del modelo Platos a partir del schema 
 */
const Platos = mongoose.model("Platos", platosSchema);

/**
 * @returns Todos los platos 
 */
Platos.get_platos = async function () {
    return Platos.find();
}
/**
 * 
 * @param {id} id_plato 
 * @returns plato especifico
 */
Platos.get_plato_id = async function (id_plato) {
    return Platos.findById(id_plato);
}
/**
 * 
 * @param {datos} plato 
 * @returns Creacion de un plato
 */
Platos.add_plato = async function (plato) {
    const nuevoPlato = new Platos(plato)
    //console.log(nuevoPlato);
    return nuevoPlato.save()
}

/**
 * 
 * @param {id} id_plato 
 * @param {datos} plato 
 * @returns plato editado 
 */
Platos.edit_plato = async function (id_plato, plato) {
    return Platos.findByIdAndUpdate(id_plato, plato, { runValidators: true, new: true, rawResult: true })
}
/**
 * 
 * @param {id} id_plato 
 * @returns plato eliminado
 */
Platos.delete_plato = async function (id_plato) {
    return Platos.findByIdAndDelete(id_plato)
}

module.exports = Platos;