const dbConn = require("../config/db.config.Usuario_MYSQL")

/**
 * Modelo para un usuario
 * @param {Datos} user 
 */
let Usuario = function (user) {
    this.DNI = user.DNI,
        this.Nombre = user.Nombre,
        this.Apellidos = user.Apellidos,
        this.Correo = user.Correo,
        this.Contraseña = user.Contraseña,
        this.id_perfiles = user.id_perfiles
}

/**
 * Recoger todos los usuarios
 * @param {Datos} resultado 
 */
Usuario.findAll = async function (resultado) {
    const sql = `select * from usuarios`
    dbConn.query(sql, function (err, res) {
        if (err) {

            resultado(err, null)
        } else {
            resultado(null, res)
        }
    })
}
/**
 * Recoger un usuario
 * @param {id} id 
 * @param {datos} resultado 
 */
Usuario.findById = async function (id, resultado) {
    const sql = "select * from usuarios where id_usuario=?"
    dbConn.query(sql, id, function (err, res) {
        if (err) {
            resultado(err, null)
        } else {
            resultado(null, res)
        }
    })
}

/**
 * Recoger un usuario para ese email
 * @param {emial} email 
 * @param {datos} resultado 
 */
Usuario.findByemail = async function (email, resultado) {
    const sql = "select * from usuarios where Correo=?"
    dbConn.query(sql, email, function (err, res) {
        if (err) {
            console.log(err);
            resultado(err, null)
        } else {

            resultado(null, res)
        }
    })
}
/**
 * Creacion de un nuevo usuario
 * @param {Datos} newUser 
 * @param {datos de la creacion} resultado 
 */
Usuario.create = async function (newUser, resultado) {
    console.log(newUser);
    const sql = "INSERT INTO usuarios (`DNI`, `Nombre`, `Apellidos`, `Correo`, `Contraseña`,`id_perfiles`) VALUES (?,?,?,?,?,?)"
    dbConn.query(sql, [newUser.DNI, newUser.Nombre, newUser.Apellidos, newUser.Correo, newUser.Contraseña, newUser.id_perfiles], function (err, res) {
        if (err) {
            resultado(err, null)
        } else {
            resultado(null, res)
        }
    })
}

/**
 * 
 * @param {id} id 
 * @param {datos} editUser 
 * @param {*datos de la editaicon} resultado 
 */
Usuario.update = async function (id, editUser, resultado) {
    const sql = "UPDATE usuarios SET ? WHERE id_usuario=?"
    dbConn.query(sql, [editUser, id], function (err, res) {
        if (err) {
            resultado(err, null)
        } else {
            resultado(null, res)
        }
    })
}


/**
 * editar la contraseña de un usuario
 * @param {id} id 
 * @param {Contraseña} password 
 * @param {datos de la contrasela} resultado 
 */
Usuario.updatePassword = async function (id, password, resultado) {
    const sql = "UPDATE usuarios SET Contraseña = ? WHERE id_usuario=?"
    dbConn.query(sql, [password, id], function (err, res) {
        if (err) {
            resultado(err, null)
        } else {
            resultado(null, res)
        }
    })
}

/**
 * Eliminar a un usuario
 * @param {id} id 
 * @param {datos de la eliminacion} resultado 
 */
Usuario.delete = async function (id, resultado) {
    const sql = "DELETE FROM usuarios where id_usuario = ?"
    dbConn.query(sql, parseInt(id), function (err, res) {
        if (err) {
            resultado(err, null)
        } else {
            resultado(null, res)
        }
    })
}
module.exports = Usuario