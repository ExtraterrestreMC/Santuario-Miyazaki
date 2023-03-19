const Usuario = require("../models/usuarios.model")
const utils = require("./utils")
// const logger = require("../logs/logger")
// const utilsLogs = require("./utilsLogs")
const bcrypt = require("bcrypt");
/**
 * Funciones para la gestion de controladores  
 */

exports.find_usuarios = async function (req, res) {
    try {
        await Usuario.findAll(function (err, usuarios) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(usuarios)
            }
        })
    } catch (err) {
        console.log(err);
    }

}

exports.findById = utils.wrapAsync(async function (req, res, next) {
    const { id } = req.params
    console.log(id);
    try {
        await Usuario.findById(id, function (err, usuario) {
            if (err) {
                console.log("parametros no encontrado");
            } else {
                if (usuario == 0) {
                    console.log("usuario no encontrado");
                } else {
                    res.status(200).json((usuario))
                }
            }
        })
    } catch (err) {
        console.log(err);
    }
})

exports.findInicioSesion = async function (req, res, next) {
    const emailycontraseña = req.body
    try {
        try {
            await Usuario.findByemail(emailycontraseña.Correo, async function (err, usuario) {
                if (err) {
                    res.status(404).json(("El email no exite"))
                } else {
                    if (usuario == 0) {
                        res.status(404).json("El usuario no exite")
                    } else {
                        let val = bcrypt.compareSync(emailycontraseña.Contraseña, usuario[0].Contraseña)
                        if (val) {
                            //jwtMiddleware.createJWT(req);
                            //req.session.usuario = usuario;
                            res.status(200).json((usuario));
                        } else {
                            res.status(406).json("Paramentros incorrecto (contraseña)")
                        }
                    }
                }
            })
        } catch {
            res.status(406).json("Correo incorrecto")
        }
    } catch {
        res.status(500).json("Base de datos no conectada")
    }
}

exports.add_usuario = async function (req, res) {
    const newUser = new Usuario(req.body)
    //console.log(newUser);
    if (newUser.DNI && newUser.Nombre && newUser.Apellidos && newUser.Correo && newUser.Contraseña && newUser.id_perfiles) {
        newUser.Contraseña = await bcrypt.hash(newUser.Contraseña, 12)
        try {
            try {
                //console.log(newUser);
                await Usuario.create(newUser, function (err, user) {
                    if (err) {
                        res.status(406).json(("faltan datos"));
                    } else {
                        res.status(200).json("Se a creado el usuario correctamente");
                    }
                })
            } catch {
                res.status(406).json("parametros no encontrados en la basededatos")
            }
        } catch {
            res.status(500).json(("base de datos no nectada"))
        }
    } else {
        res.status(406).json("paramentros incorrectos")
    }
}

exports.edit_usuario = async function (req, res) {
    const editUser = new Usuario(req.body);
    //console.log(editUser);
    const { id } = req.params
    console.log(id);
    if (editUser.DNI && editUser.Nombre && editUser.Apellidos && editUser.Correo && editUser.Contraseña && editUser.id_perfiles) {
        editUser.Contraseña = await bcrypt.hash(editUser.Contraseña, 12)
        try {
            try {
                console.log(editUser);
                await Usuario.update(id, editUser, function (err, user) {
                    if (err) {
                        res.status(406).json("faltan datos")
                    } else {
                        res.status(200).json("Usuario editado correcamente")
                    }
                })
            } catch {
                res.status(406).json("parametros no encontrados en la basededatos")
            }
        } catch {
            res.status(500).json("base de datos no conectada")
        }
    } else {
        res.status(406).json("faltan datos desde el cliente")
    }
}

exports.delete_usuario = async function (req, res) {
    const { id } = req.params
    try {
        try {
            await Usuario.delete(id, function (err, user) {
                if (err) {
                    res.status(404).json(("Usuario no encontrado"))
                } else {
                    res.status(200).json(("USuario borrado correctamente"))
                }
            })
        } catch {
            res.status(406).json("Faltan datos")
        }

    } catch {
        res.status(500).json("Base de datos no conectada")
    }
}