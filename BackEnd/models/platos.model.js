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
        type: String,
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
 * Generación del modelo Platos a partir del schema 
 */
const Platos = mongoose.model("Platos", platosSchema);


Platos.get_platos = async function () {
    return Platos.find();
}

Platos.get_plato_id = async function (id_plato) {
    return Platos.findById(id_plato);
}

Platos.add_plato = async function (plato) {
    const nuevoPlato = new Platos(plato)
    return nuevoPlato.save()
}

Platos.edit_plato = async function (id_plato, plato) {
    return Platos.findByIdAndUpdate(id_plato, plato, { runValidators: true, new: true, rawResult: true })
}
Platos.delete_plato = async function (id_plato) {
    return Platos.findByIdAndDelete(id_plato)
}

module.exports = Platos;