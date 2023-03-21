const mongoose = require("mongoose");
/**
 * Schema de una Tarea
 */
const BonosSchema = new mongoose.Schema({
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
    }
});

/**
 * Generación del modelo Tarea a partir del schema 
 */
const Bonos = mongoose.model("Bonos", BonosSchema);

Bonos.get_Bonos = async function () {
    return Bonos.find();
}

Bonos.get_bono_id = async function (id_bono) {
    return Bonos.findById(id_bono);
}

Bonos.add_bono = async function (bono) {
    const nuevobono = new Bonos(bono)
    return nuevobono.save()
}

Bonos.edit_bono = async function (id_bono, bono) {
    return Bonos.findByIdAndUpdate(id_bono, bono, { runValidators: true, new: true, rawResult: true })
}
Bonos.delete_bono = async function (id_bono) {
    return Bonos.findByIdAndDelete(id_bono)
}

module.exports = Bonos;