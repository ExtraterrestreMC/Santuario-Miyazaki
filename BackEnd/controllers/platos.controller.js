const Platos = require("../models/platos.model")
const dbConn = require("../config/db.config.MongoDB");
const utils = require("./utils")
const NoExisteError = require("./errors/NoExisteError");
const BaseDatosNoConectadaError = require("./errors/BaseDatosNoConectadaError");
const MissingDatosError = require("./errors/MissingDatosError");
const ParametrosIncorrectosError = require("./errors/ParametrosIncorrectosError");
const ErrInterno = require("./errors/ErrInterno");
const logger = require("../logs/logger")
const utilsLogs = require("./utilsLogs")
const fs = require("fs")
const path = require("path");
const { log } = require("console");
const ruta = "D:/dd/TFG/BackEnd/public/img"

exports.find_platos = utils.wrapAsync(async function (req, res, next) {
    try {
        await dbConn.conectar;
        await Platos.get_platos()
            .then((platos) => res.status(200).json(platos))
            .catch((error) => {
                logger.error.error(utilsLogs.errInterno(err));
                throw new ErrInterno(utils.errInterno(err));
            })
    } catch (err) {
        if (!(err instanceof ErrInterno)) {
            logger.error.error(utilsLogs.baseDatosNoConectada());
            throw new BaseDatosNoConectadaError(utils.baseDatosNoConectada())
        } else {
            throw err;
        }
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
                        logger.warning.warn(utilsLogs.noExiste("plato"));
                        throw new NoExisteError(utils.noExiste("plato"));
                    } else {
                        logger.access.info(utilsLogs.accesoCorrecto(`el plato: ${plato._id}`));
                        res.status(200).json(plato)
                    }
                })
                .catch((err) => {
                    /*res.status(406).json(utils.parametrosIncorrectos()*/
                    if (!(err instanceof NoExisteError)) {
                        logger.warning.warn(utilsLogs.parametrosIncorrectos());
                        throw new ParametrosIncorrectosError(utils.parametrosIncorrectos())
                    } else {
                        throw err;
                    }
                })
        } catch (err) {
            //res.status(406).json(utils.parametrosIncorrectos());
            if (!(err instanceof NoExisteError)) {
                logger.error.error(utilsLogs.baseDatosNoConectada());
                throw new ParametrosIncorrectosError(utils.parametrosIncorrectos())
            } else {
                throw err;
            }
        }
    } catch (err) {
        //res.status(500).json(utils.baseDatosNoConectada());
        if (!((err instanceof NoExisteError) || (err instanceof ParametrosIncorrectosError))) {
            logger.error.error(utilsLogs.baseDatosNoConectada());
            throw new BaseDatosNoConectadaError(utils.baseDatosNoConectada())
        } else {
            throw err;
        }
    }
})

exports.add_plato = utils.wrapAsync(async function (req, res, next) {
    let plato = req.body;
    console.log(plato);
    console.log(plato.imagen);
    const rutavieja = `${ruta}/${plato.imagen}`
    if (plato.nombre && plato.precio && plato.descripcion && plato.imagen) {
        try {
            await dbConn.conectar;
            try {
                await Platos.add_plato(plato)
                    .then((result) => {
                        const rutanueva = `${ruta}/${result._id}.jpg`
                        fs.rename(rutavieja, rutanueva, (error) => {

                            if (!error) {
                                result.imagen = result._id
                                Platos.edit_plato(result._id, result)
                                res.status(201).json(utils.creadoCorrectamente('plato'));
                                logger.access.info(utilsLogs.creadoCorrectamente("plato", result._id));
                            } else {
                                console.log(error);
                            }
                        })
                    }).catch((err) => {
                        console.log(err);
                        res.status(406).json(utils.parametrosIncorrectos())
                        logger.warning.warn(utilsLogs.parametrosIncorrectos());;
                    })
            } catch (err) {
                /**
                 * TODO Corregir
                 */
                //console.log("segundo");
                console.log(err);
                //console.log(res);
                //res.status(406).json(err);
                //logger.warning.warn(utilsLogs.parametrosIncorrectos());
            }
        } catch (err) {
            res.status(500).json(utils.baseDatosNoConectada());
            logger.error.error(utilsLogs.baseDatosNoConectada());
        }
    } else {
        logger.warning.warn(utilsLogs.faltanDatosAcceso("añadir una plato"));
        throw new MissingDatosError(utils.missingDatos())
    }
})

exports.edit_plato = utils.wrapAsync(async function (req, res, next) {
    let id = req.params.id
    let plato = req.body;
    console.log("principal");
    console.log(plato);
    const rutavieja = `${ruta}/${plato.imagen}`
    console.log(rutavieja);
    const rutanueva = `${ruta}/${id}.jpg`
    console.log(rutanueva);
    if (plato.nombre && plato.precio && plato.descripcion && plato.imagen) {
        console.log("primer if");
        console.log(plato);
        try {
            await dbConn.conectar;
            console.log("dbconexion");
            console.log(plato);
            try {
                console.log("try despues DBConexion");
                console.log(plato);
                fs.renameSync(rutavieja, rutanueva)
                plato.imagen = id
                console.log("en rename:");
                console.log(plato);
                await Platos.edit_plato(id, plato)
                    .then((resultado) => {
                        if (resultado.value === null) {
                            res.status(404).json(utils.noExiste("plato"));
                            logger.warning.warn(utilsLogs.noExiste("plato"));
                        } else {

                            console.log(resultado);
                            res.status(200).json(utils.editadoCorrectamente("plato"))
                            logger.access.info(utilsLogs.actualizadoCorrectamente("plato", resultado.value._id));



                        }
                    }).catch((err) => {
                        console.log(err);
                        res.status(406).json(utils.parametrosIncorrectos())
                        logger.warning.warn(utilsLogs.parametrosIncorrectos());
                    })
            } catch (err) {
                //res.status(406).json(utils.parametrosIncorrectos());
                logger.warning.warn(utilsLogs.parametrosIncorrectos());
            }

        } catch (err) {
            res.status(406).json(utils.parametrosIncorrectos());
            logger.warning.warn(utilsLogs.parametrosIncorrectos());
        }
    } else {
        logger.warning.warn(utilsLogs.faltanDatosAcceso("editar un plato"));
        throw new MissingDatosError(utils.missingDatos())
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
                        logger.warning.warn(utilsLogs.noExiste("platos"));
                        throw new NoExisteError(utils.noExiste("platos"));
                    } else {
                        res.status(200).json(utils.borradoCorrectamente("platos"));
                        logger.access.info(utilsLogs.borradoCorrectamente("platos", info._id));
                    }
                })
                .catch((err) => {
                    //res.status(406).json(utils.parametrosIncorrectos())
                    if (!(err instanceof NoExisteError)) {
                        logger.warning.warn(utilsLogs.parametrosIncorrectos());
                        throw new ParametrosIncorrectosError(utils.parametrosIncorrectos())
                    } else {
                        throw err;
                    }
                });
        } catch (err) {
            //res.status(406).json(utils.parametrosIncorrectos());
            if (!((err instanceof NoExisteError) || (err instanceof ParametrosIncorrectosError))) {
                logger.warning.warn(utilsLogs.parametrosIncorrectos());
                throw new ParametrosIncorrectosError(utils.parametrosIncorrectos())
            } else {
                throw err;
            }
        }
    } catch (err) {
        //res.status(500).json(utils.baseDatosNoConectada());
        if (!((err instanceof NoExisteError) || (err instanceof ParametrosIncorrectosError))) {
            logger.error.error(utilsLogs.baseDatosNoConectada());
            throw new BaseDatosNoConectadaError(utils.baseDatosNoConectada())
        } else {
            throw err;
        }
    }

})