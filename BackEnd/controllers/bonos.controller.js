const Bonos = require("../models/Bonos.model")
const dbConn = require("../config/db.config.MongoDB");
const utils = require("./utils")
const NoExisteError = require("./errors/NoExisteError");
const BaseDatosNoConectadaError = require("./errors/BaseDatosNoConectadaError");
const MissingDatosError = require("./errors/MissingDatosError");
const ParametrosIncorrectosError = require("./errors/ParametrosIncorrectosError");
const ErrInterno = require("./errors/ErrInterno");
const logger = require("../logs/logger")
const utilsLogs = require("./utilsLogs")

/**
 * Funciona para recoger todos los bonos de la base de datos
 */
exports.find_bonos = utils.wrapAsync(async function (req, res, next) {
    try {
        await dbConn.conectar;
        await Bonos.get_Bonos()
            .then((bonos) => res.status(200).json(bonos))
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

/**
 * Funciona para recoger un bono de la base de datos
 */
exports.get_bono_id = utils.wrapAsync(async function (req, res, next) {
    let id = req.params.id;
    try {
        await dbConn.conectar;
        try {
            await Bonos.get_bono_id(id)
                .then((bono) => {
                    if (bono === null) {
                        logger.warning.warn(utilsLogs.noExiste("bono"));
                        throw new NoExisteError(utils.noExiste("bono"));
                    } else {
                        logger.access.info(utilsLogs.accesoCorrecto(`el bono: ${bono._id}`));
                        res.status(200).json(bono)
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

/**
 * Funcioncion para añadir un bono a la abse de datos 
 * Datos se recogen por el req.body
 */
exports.add_bono = utils.wrapAsync(async function (req, res, next) {
    let bono = req.body;
    if (bono.nombre && bono.precio && bono.descripcion) {
        try {
            await dbConn.conectar;
            try {
                await Bonos.add_bono(bono)
                    .then((resultado) => {
                        res.status(201).json(utils.creadoCorrectamente('bono'));
                        logger.access.info(utilsLogs.creadoCorrectamente("bono", resultado._id));
                    }).cath((err) => {
                        res.status(406).json(utils.parametrosIncorrectos())
                        logger.warning.warn(utilsLogs.parametrosIncorrectos());;
                    })
            } catch (err) {
                //res.status(406).json(utils.parametrosIncorrectos());
                logger.warning.warn(utilsLogs.parametrosIncorrectos());
            }
        } catch (err) {
            res.status(500).json(utils.baseDatosNoConectada());
            logger.error.error(utilsLogs.baseDatosNoConectada());
        }
    } else {
        logger.warning.warn(utilsLogs.faltanDatosAcceso("añadir una bono"));
        throw new MissingDatosError(utils.missingDatos())
    }
})

/**
 * Funciona para editar un bono 
 * Datos se recogen por el req.body y el parametro de id del bono por req.params.id
 */
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
                            res.status(404).json(utils.noExiste("bono"));
                            logger.warning.warn(utilsLogs.noExiste("bono"));
                        } else {
                            res.status(200).json(utils.editadoCorrectamente("bono"))
                            logger.access.info(utilsLogs.actualizadoCorrectamente("bono", resultado.value._id));
                        }
                    }).cath((err) => {
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
        logger.warning.warn(utilsLogs.faltanDatosAcceso("editar un bono"));
        throw new MissingDatosError(utils.missingDatos())
    }
})
/**
 * Funcion para elimnar un bono de la base de atos
 * el id del bono se recoge por req.params.id
 */
exports.delete_bono = utils.wrapAsync(async function (req, res, next) {
    let id = req.params.id;

    try {
        await dbConn.conectar;
        try {
            await Bonos.delete_bono(id)
                .then((info) => {
                    if (info === null) {
                        logger.warning.warn(utilsLogs.noExiste("bonos"));
                        throw new NoExisteError(utils.noExiste("bonos"));
                    } else {
                        res.status(200).json(utils.borradoCorrectamente("bonos"));
                        logger.access.info(utilsLogs.borradoCorrectamente("bonos", info._id));
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