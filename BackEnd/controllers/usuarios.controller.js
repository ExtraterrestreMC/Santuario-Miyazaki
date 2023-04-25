const Usuario = require("../models/usuarios.model")
const utils = require("./utils")
const logger = require("../logs/logger")
const utilsLogs = require("./utilsLogs")
const bcrypt = require("bcrypt");
const jwtMiddleware = require("../middlewares/jwt.mw")
const jwt = require("jsonwebtoken");
/**
 * Funciones para la gestion de controladores  
 */

exports.find_usuarios = async function(req, res) {
    try {
        await Usuario.findAll(function(err, usuarios) {
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

exports.findById = utils.wrapAsync(async function(req, res, next) {
    const { id } = req.params
        //console.log(id);
    try {
        await Usuario.findById(id, function(err, usuario) {
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
        console.log(err);
        res.status(500).json((utils.baseDatosNoConectada())),
            logger.error.err(utilsLogs.baseDatosNoConectada());
    }
})

exports.findInicioSesion = async function(req, res, next) {
    const emailycontraseña = req.body
    console.log(emailycontraseña);
    try {
        try {
            await Usuario.findByemail(emailycontraseña.username, async function(err, usuario) {
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
                            console.log(usuario);
                            //console.log(req);
                            jwtMiddleware.createJWT(req);
                            req.session.usuario = usuario;
                            //console.log(req.session.token);
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

exports.cerrarSesion_usuario = function(req, res, next) {
    console.log("Controler");
    console.log(req.session);
    const token = jwtMiddleware.extractToken(req);
    //console.log(token)
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
        res.status(404).json(mensajes.noExiste("toasdasdadken"));
    }
}



exports.add_usuario = async function(req, res) {
    const newUser = new Usuario(req.body)
    newUser.id_perfiles = 2
    console.log(newUser);
    if (newUser.DNI && newUser.Nombre && newUser.Apellidos && newUser.Correo && newUser.Contraseña && newUser.id_perfiles != null) {

        newUser.Contraseña = await bcrypt.hash(newUser.Contraseña, 12)
        try {
            try {
                //console.log(newUser);
                await Usuario.create(newUser, function(err, usuario) {
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

exports.edit_usuario = async function(req, res) {
    const editUser = new Usuario(req.body);
    console.log(editUser);
    const { id } = req.params


    if (editUser.DNI && editUser.Nombre && editUser.Apellidos && editUser.Correo && editUser.Contraseña && editUser.id_perfiles) {

        await Usuario.findByemail(editUser.Correo, async function(err, usuario) {
            if (err) {
                res.status(404).json((utils.noExiste("El email"))),
                    logger.warning.warn(utilsLogs.noExiste("usuario con el correo: " + emailycontraseña.username + " y con la contraseña: " + emailycontraseña.password));
            } else {
                if (usuario == 0) {
                    res.status(404).json(utils.noExiste("usuario")),
                        logger.warning.warn(utilsLogs.noExiste("usuario"));
                } else {
                    let val = bcrypt.compareSync(editUser.Contraseña, usuario[0].Contraseña)
                    console.log("el valor es :" + val);
                    if (val || editUser.Contraseña == usuario[0].Contraseña) {
                        try {
                            try {
                                console.log(editUser);
                                await Usuario.update(id, editUser, function(err, usuario) {
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
                    } else {
                        try {
                            try {
                                editUser.Contraseña = await bcrypt.hash(editUser.Contraseña, 12)
                                console.log(editUser);
                                await Usuario.update(id, editUser, function(err, usuario) {
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
            }
        })

    }
}
exports.edit_password = async function(req, res) {
    const password = req.body;
    const { id } = req.params
    console.log(password.Contraseña);
    console.log(id);
    if (password) {
        try {
            Usuario.findById(id, function(err, usuario) {
                if (err) {
                    res.status(406).json(utils.parametrosIncorrectos()),
                        logger.warning.warn(utilsLogs.parametrosIncorrectos())
                } else {
                    if (usuario == 0) {
                        res.status(404).json(utils.noExiste("usuario")),
                            logger.warning.warn(utilsLogs.noExiste("usuario con id: " + id));
                    } else {
                        /*7hJ#e2kM*/
                        console.log(password);
                        let newContraseña = bcrypt.hashSync(password.Contraseña, 12)
                        try {
                            Usuario.updatePassword(id, newContraseña, function(err, usuario) {
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

                        }
                    }
                }
            })
        } catch {

        }
    } else {
        res.status(406).json(utils.parametrosIncorrectos()),
            logger.warning.warn(utilsLogs.parametrosIncorrectos())
    }
}
exports.delete_usuario = async function(req, res) {
    const { id } = req.params
    try {
        try {
            await Usuario.delete(id, function(err, usuari) {
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