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

/**
 * Funcion para recoger todos los platos de la base de datos
 */
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

/**
 * Funcion para recoger solo un plato de la base de datos 
 * la id del plato se recoge por req.params.id
 */
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

/**
 * Funcion para añadir un plato a la base de datos
 * los datos se reciben por req.body
 */
exports.add_plato = utils.wrapAsync(async function (req, res, next) {
    let plato = req.body;

    if (plato.nombre && plato.precio && plato.descripcion && plato.imagen != "") {
        try {
            await dbConn.conectar;
            try {
                await Platos.add_plato(plato)
                    .then((result) => {
                        res.status(201).json(utils.creadoCorrectamente('plato'));
                        logger.access.info(utilsLogs.creadoCorrectamente("plato", result._id));
                    }).catch((err) => {
                        res.status(406).json(utils.parametrosIncorrectos())
                        logger.warning.warn(utilsLogs.parametrosIncorrectos());;
                    })
            } catch (err) {
                res.status(406).json(utils.parametrosIncorrectos())
                logger.warning.warn(utilsLogs.parametrosIncorrectos());
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

/**
 * Funcion para editar un plato de la base de datos
 * id  se pasara por req.params.id
 * Datos se pasaran por req.body
 */
exports.edit_plato = utils.wrapAsync(async function (req, res, next) {
    let id = req.params.id
    let plato = req.body;

    if (plato.nombre && plato.precio && plato.descripcion && plato.imagen) {

        try {
            await dbConn.conectar;
            try {
                await Platos.edit_plato(id, plato)
                    .then((resultado) => {
                        if (resultado.value === null) {
                            res.status(404).json(utils.noExiste("plato"));
                            logger.warning.warn(utilsLogs.noExiste("plato"));
                        } else {
                            res.status(200).json(utils.editadoCorrectamente("plato"))
                            logger.access.info(utilsLogs.actualizadoCorrectamente("plato", resultado.value._id));
                        }
                    }).catch((err) => {
                        res.status(406).json(utils.parametrosIncorrectos())
                        logger.warning.warn(utilsLogs.parametrosIncorrectos());
                    })
            } catch (err) {
                res.status(406).json(utils.parametrosIncorrectos());
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
/**
 * Funcion para elimnar un plato de la base de datos
 * la id se pasara a traves de req.params.id
 */
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
                    if (!(err instanceof NoExisteError)) {
                        logger.warning.warn(utilsLogs.parametrosIncorrectos());
                        throw new ParametrosIncorrectosError(utils.parametrosIncorrectos())
                    } else {
                        throw err;
                    }
                });
        } catch (err) {
            if (!((err instanceof NoExisteError) || (err instanceof ParametrosIncorrectosError))) {
                logger.warning.warn(utilsLogs.parametrosIncorrectos());
                throw new ParametrosIncorrectosError(utils.parametrosIncorrectos())
            } else {
                throw err;
            }
        }
    } catch (err) {
        if (!((err instanceof NoExisteError) || (err instanceof ParametrosIncorrectosError))) {
            logger.error.error(utilsLogs.baseDatosNoConectada());
            throw new BaseDatosNoConectadaError(utils.baseDatosNoConectada())
        } else {
            throw err;
        }
    }

})