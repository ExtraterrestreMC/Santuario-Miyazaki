const Bonos = require("../models/Bonos.model")
const dbConn = require("../config/db.config.MongoDB");
const utils = require("./utils")

exports.find_bonos = utils.wrapAsync(async function (req, res, next) {
    try {
        await dbConn.conectar;
        await Bonos.get_Bonos()
            .then((Bonos) => res.status(200).json(Bonos))
            .catch((error) => {
                res.status(500).json(utils.errInterno(error))
            })
    } catch (err) {
        console.log("base de datos no conectada");
    }

})

exports.get_bono_id = utils.wrapAsync(async function (req, res, next) {
    let id = req.params.id;

    try {
        await dbConn.conectar;
        try {
            await Bonos.get_bono_id(id)
                .then((bono) => {
                    if (bono === null) {
                        console.log("bono no exite");
                    } else {
                        res.status(200).json(bono)
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

exports.add_bono = utils.wrapAsync(async function (req, res, next) {
    let bono = req.body;
    if (bono.nombre && bono.precio && bono.descripcion) {
        try {
            await dbConn.conectar;
            try {
                await Bonos.add_bono(bono)
                    .then((resultado) => {
                        res.status(201).json("bono creada correctamente")
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

exports.edit_bono = utils.wrapAsync(async function (req, res, next) {
    let id = req.params.id
    let bono = req.body;

    if (bono.nombre && bono.precio && bono.descripcion) {
        try {
            await dbConn.conectar;
            try {
                await Bonos.edit_bono(id, bono)
                    .then((resultado) => {
                        if (resultado.value === null) {
                            res.status(404).json("No exite bono")
                        } else {
                            res.status(201).json("bono editada correctamente")
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
exports.delete_bono = utils.wrapAsync(async function (req, res, next) {
    let id = req.params.id;

    try {
        await dbConn.conectar;
        try {
            await Bonos.delete_bono(id)
                .then((info) => {
                    if (info === null) {
                        res.status(404).json(utils.noExiste("bono"));
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