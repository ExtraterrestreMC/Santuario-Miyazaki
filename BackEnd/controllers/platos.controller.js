const Platos = require("../models/platos.model")
const dbConn = require("../config/db.config.MongoDB");
const utils = require("./utils")

exports.find_platos = utils.wrapAsync(async function (req, res, next) {
    try {
        await dbConn.conectar;
        await Platos.get_platos()
            .then((platos) => res.status(200).json(platos))
            .catch((error) => {
                res.status(500).json(utils.errInterno(error))
            })
    } catch (err) {
        console.log("base de datos no conectada");
    }

})

exports.get_plato_id = utils.wrapAsync(async function (req, res, next) {
    let id = req.params.id;

    try {
        await dbConn.conectar;
        try {
            await Platos.get_plato_id(id)
                .then((plato) => {
                    if (plato === null) {
                        console.log("Plato no exite");
                    } else {
                        res.status(200).json(plato)
                    }
                })
                .catch((err) => {
                    console.log("datos incorrectos 2");
                })
        } catch (err) {
            console.log("Parametros incorrectos");
        }
    } catch (err) {
        console.log("base de datos no conectada");
    }

})

exports.add_plato = utils.wrapAsync(async function (req, res, next) {
    let plato = req.body;
    if (plato.nombre && plato.precio && plato.descripcion && plato.imagen && plato.extension) {
        try {
            await dbConn.conectar;
            try {
                await Platos.add_plato(plato)
                    .then((resultado) => {
                        res.status(201).json("plato creada correctamente")
                    }).cath((err) => {
                        console.log("Paramentros incorrectos 2");
                    })
            } catch (err) {
                console.log("Parametros incorrectos");
            }
        } catch (err) {
            console.log("base de datos no conectada");
        }
    } else {
        console.log("faltan datos");
    }
})

exports.edit_plato = utils.wrapAsync(async function (req, res, next) {
    let id = req.params.id
    let plato = req.body;

    if (plato.nombre && plato.precio && plato.descripcion && plato.imagen && plato.extension) {
        try {
            await dbConn.conectar;
            try {
                await Platos.edit_plato(id, plato)
                    .then((resultado) => {
                        if (resultado.value === null) {
                            res.status(404).json("No exite plato")
                        } else {
                            res.status(201).json("plato editada correctamente")
                        }
                    }).cath((err) => {
                        console.log("Paramentros incorrectos 2");
                    })
            } catch (err) {
                console.log("Parametros incorrectos");
            }
        } catch (err) {
            console.log("base de datos no conectada");
        }
    } else {
        console.log("faltan datos");
    }
})
exports.delete_plato = utils.wrapAsync(async function (req, res, next) {
    let id = req.params.id;

    try {
        await dbConn.conectar;
        try {
            await Platos.delete_plato(id)
                .then((info) => {
                    if (info === null) {
                        res.status(404).json(utils.noExiste("plato"));
                    } else {
                        res.status(200).json("Borrado correctamente");
                    }
                })
                .catch((err) => {
                    console.log("datos incorrectos");
                });
        } catch (err) {
            res.status(406).json(utils.parametrosIncorrectos());
            console.log("parametros incorrectos");
        }
    } catch (err) {
        console.log("base de datos no conecta");

    }

})