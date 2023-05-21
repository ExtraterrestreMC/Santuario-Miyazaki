const Usuario = require("../models/usuarios.model")
const utils = require("./utils")
const logger = require("../logs/logger")
const utilsLogs = require("./utilsLogs")
const bcrypt = require("bcrypt");
const jwtMiddleware = require("../middlewares/jwt.mw.new")
const jwt = require("jsonwebtoken");

/**
 * Funcion para recoger todos los usuarios de la base de datos
 * @param {datos recibidos} req 
 * @param {respuesta} res 
 */
exports.find_usuarios = async function (req, res) {
    try {
        await Usuario.findAll(function (err, usuarios) {
            if (err) {
                res.status(500).json((utils.errInterno(err))),
                    logger.error.err(utilsLogs.errInterno(err));
            } else {
                res.status(200).json(usuarios)
                logger.access.info(utilsLogs.accesoCorrecto('Todos Usuarios'));
            }
        })
    } catch (err) {
        res.status(500).json((utils.baseDatosNoConectada())),
            logger.error.err(utilsLogs.baseDatosNoConectada())
    }

}

/**
 * Funcion para recoger un usuario de la base de datos
 * @param {datos recibidos} req 
 * @param {respuesta} res 
 */
exports.findById = utils.wrapAsync(async function (req, res, next) {
    const { id } = req.params
    try {
        await Usuario.findById(id, function (err, usuario) {
            if (err) {
                res.status(406).json(utils.parametrosIncorrectos()),
                    logger.warning.warn(utilsLogs.parametrosIncorrectos())
            } else {
                if (usuario == 0) {
                    res.status(404).json(utils.noExiste("usuario")),
                        logger.warning.warn(utilsLogs.noExiste("usuario con id: " + id));
                } else {

                    res.status(200).json((usuario)),
                        logger.access.info(utilsLogs.accesoCorrecto(`usuario ${id}`))
                }
            }
        })
    } catch (err) {
        res.status(500).json((utils.baseDatosNoConectada())),
            logger.error.err(utilsLogs.baseDatosNoConectada());
    }
})

/**
 * Funcion para recoger un usuario de la base de datos con un correo en especifico
 * @param {datos recibidos} req 
 * @param {respuesta} res 
 */
exports.findInicioSesion = async function (req, res, next) {
    const emailycontraseña = req.body
    try {
        try {
            await Usuario.findByemail(emailycontraseña.username, async function (err, usuario) {
                if (err) {
                    res.status(404).json((utils.noExiste("El email"))),
                        logger.warning.warn(utilsLogs.noExiste("usuario con el correo: " + emailycontraseña.username + " y con la contraseña: " + emailycontraseña.password));
                } else {
                    if (usuario == 0) {
                        res.status(404).json(utils.noExiste("usuario")),
                            logger.warning.warn(utilsLogs.noExiste("usuario"));
                    } else {
                        let val = bcrypt.compareSync(emailycontraseña.password, usuario[0].Contraseña)
                        if (val) {

                            jwtMiddleware.createJWT(req);
                            req.session.usuario = usuario;

                            logger.access.info(utilsLogs.accesoCorrecto(usuario[0]))

                            res.status(200).json((usuario));

                        } else {
                            res.status(406).json(utils.parametrosIncorrectos()),
                                logger.warning.warn(utilsLogs.parametrosIncorrectos());
                        }
                    }
                }
            })
        } catch {
            res.status(406).json(utils.parametrosIncorrectos()),
                logger.warning.warn(utilsLogs.parametrosIncorrectos());
        }
    } catch {
        res.status(500).json((utils.baseDatosNoConectada())),
            logger.error.err(utilsLogs.baseDatosNoConectada());
    }
}

/**
 * Funcion para eliminar la sesion de un usuario
 * @param {datos recibidos} req 
 * @param {respuesta} res 
 */
exports.cerrarSesion_usuario = function (req, res, next) {

    const token = jwtMiddleware.extractToken(req);

    if (token) {
        jwt.sign(token, jwtMiddleware.claveJWT, { expiresIn: 1 }, (cerrarSesion, err) => {
            if (cerrarSesion) {
                if (req.session && req.session.token) {
                    req.session.destroy()
                    res.status(200).json(utils.borradoCorrectamente("token"));
                }
            } else {
                res.status(500).json(utils.errInterno(err));
            }
        })
    } else {
        res.status(404).json(utils.noExiste("toasdasdadken"));
    }
}


/**
 * Funcion para añadir a un usuario en la base de datos
 * @param {datos recibidos} req 
 * @param {respuesta} res 
 */
exports.add_usuario = async function (req, res) {
    const newUser = new Usuario(req.body)
    newUser.id_perfiles = 2

    if (newUser.DNI && newUser.Nombre && newUser.Apellidos && newUser.Correo && newUser.Contraseña && newUser.id_perfiles != null) {

        /**
         * Se encrimpata la contraseña
         */
        newUser.Contraseña = await bcrypt.hash(newUser.Contraseña, 12)
        try {
            try {

                await Usuario.create(newUser, function (err, usuario) {
                    if (err) {
                        res.status(406).json((utils.parametroDucplicado()));
                        logger.warning.warn(utilsLogs.parametroDucplicado(newUser));
                    } else {
                        res.status(200).json((utils.creadoCorrectamente("usuario")));
                        logger.access.info(utilsLogs.creadoCorrectamente("usuario", usuario.id_usuario));
                    }
                })
            } catch {
                res.status(406).json(utils.parametrosIncorrectos()),
                    logger.warning.warn(utilsLogs.parametrosIncorrectos());
            }
        } catch {
            res.status(500).json((utils.baseDatosNoConectada())),
                logger.error.err(utilsLogs.baseDatosNoConectada())
        }
    } else {
        res.status(406).json(utils.parametrosIncorrectos()),
            logger.warning.warn(utilsLogs.parametrosIncorrectos())
    }
}

/**
 * Funcion para editar un usuario de la base de datos
 * @param {datos recibidos} req 
 * @param {respuesta} res 
 */
exports.edit_usuario = async function (req, res) {
    const editUser = (req.body);

    const { id } = req.params


    if (editUser.DNI && editUser.Nombre && editUser.Apellidos && editUser.Correo && editUser.id_perfiles) {

        await Usuario.findById(id, async function (err, usuario) {
            if (err) {
                res.status(404).json((utils.noExiste("El usuario"))),
                    logger.warning.warn(utilsLogs.noExiste("usuario con el id: " + id));
            } else {
                if (usuario == 0) {
                    res.status(404).json(utils.noExiste("usuario")),
                        logger.warning.warn(utilsLogs.noExiste("usuario"));
                } else {

                    try {
                        try {

                            await Usuario.update(id, editUser, function (err, usuario) {
                                if (err) {
                                    res.status(406).json((utils.missingDatos())),
                                        logger.warning.warn(utilsLogs.faltanDatos("al usuario"));;
                                } else {

                                    res.status(200).json((utils.editadoCorrectamente("usuario"))),
                                        logger.access.info(utilsLogs.actualizadoCorrectamente("usuario", usuario
                                            .id_usuario));
                                }
                            })
                        } catch {
                            res.status(406).json(utils.parametrosIncorrectos()),
                                logger.warning.warn(utilsLogs.parametrosIncorrectos());
                        }
                    } catch {
                        res.status(500).json((utils.baseDatosNoConectada())),
                            logger.error.err(utilsLogs.baseDatosNoConectada())
                    }

                }
            }
        })

    }
}

/**
 * Funcion para editar la contraseña de un usuario de la base de datos
 * @param {datos recibidos} req 
 * @param {respuesta} res 
 */
exports.edit_password = async function (req, res) {
    const password = req.body;
    const { id } = req.params

    if (password.Password) {
        try {
            Usuario.findById(id, function (err, usuario) {
                if (err) {
                    res.status(406).json(utils.parametrosIncorrectos()),
                        logger.warning.warn(utilsLogs.parametrosIncorrectos())
                } else {
                    if (usuario == 0) {
                        res.status(404).json(utils.noExiste("usuario")),
                            logger.warning.warn(utilsLogs.noExiste("usuario con id: " + id));
                    } else {

                        try {
                            let newContraseña = bcrypt.hashSync(password.Password, 12)

                            try {
                                Usuario.updatePassword(id, newContraseña, function (err, usuario) {
                                    if (err) {
                                        res.status(406).json((utils.missingDatos())),
                                            logger.warning.warn(utilsLogs.faltanDatos("al usuario"));;
                                    } else {
                                        res.status(200).json((utils.editadoCorrectamente("usuario"))),
                                            logger.access.info(utilsLogs.actualizadoCorrectamente("usuario", usuario
                                                .id_usuario));
                                    }
                                })
                            } catch {
                                res.status(500).json((utils.baseDatosNoConectada())),
                                    logger.error.err(utilsLogs.baseDatosNoConectada())
                            }
                        } catch (error) {
                            res.status(406).json((utils.missingDatos()))
                        }


                    }
                }
            })
        } catch {
            res.status(500).json((utils.baseDatosNoConectada())),
                logger.error.err(utilsLogs.baseDatosNoConectada())
        }
    } else {
        res.status(406).json(utils.parametrosIncorrectos()),
            logger.warning.warn(utilsLogs.parametrosIncorrectos())
    }
}
/**
 * Funcion para eliminar un usuario de la base de datos
 * @param {datos recibidos} req 
 * @param {respuesta} res 
 */
exports.delete_usuario = async function (req, res) {
    const { id } = req.params
    try {
        try {
            await Usuario.delete(id, function (err, usuari) {
                if (err) {
                    res.status(404).json((utils.noExiste("usuario"))),
                        logger.warning.warn(utilsLogs.noExiste("usuario"));;
                } else {
                    res.status(200).json((utils.borradoCorrectamente("usuario"))),
                        logger.warning.warn(utilsLogs.borradoCorrectamente("usuario", id));
                }
            })
        } catch {
            res.status(406).json(utils.parametrosIncorrectos()),
                logger.warning.warn(utilsLogs.parametrosIncorrectos());
        }

    } catch {
        res.status(500).json((utils.baseDatosNoConectada())),
            logger.error.err(utilsLogs.baseDatosNoConectada())
    }
}