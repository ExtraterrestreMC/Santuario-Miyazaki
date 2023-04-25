const dbConn = require("../config/db.config.Usuario_MYSQL")

let Usuario = function(user) {
    this.DNI = user.DNI,
        this.Nombre = user.Nombre,
        this.Apellidos = user.Apellidos,
        this.Correo = user.Correo,
        this.Contraseña = user.Contraseña,
        this.id_perfiles = user.id_perfiles
}

Usuario.findAll = async function(resultado) {
    const sql = `select * from usuarios`
    dbConn.query(sql, function(err, res) {
        if (err) {

            resultado(err, null)
        } else {
            resultado(null, res)
        }
    })
}

Usuario.findById = async function(id, resultado) {
    const sql = "select * from usuarios where id_usuario=?"
    dbConn.query(sql, id, function(err, res) {
        if (err) {
            resultado(err, null)
        } else {
            resultado(null, res)
        }
    })
}

Usuario.findByemail = async function(email, resultado) {
    const sql = "select * from usuarios where Correo=?"
    dbConn.query(sql, email, function(err, res) {
        if (err) {
            resultado(err, null)
        } else {
            resultado(null, res)
        }
    })
}
Usuario.create = async function(newUser, resultado) {
    console.log(newUser);
    const sql = "INSERT INTO usuarios (`DNI`, `Nombre`, `Apellidos`, `Correo`, `Contraseña`,`id_perfiles`) VALUES (?,?,?,?,?,?)"
    dbConn.query(sql, [newUser.DNI, newUser.Nombre, newUser.Apellidos, newUser.Correo, newUser.Contraseña, newUser.id_perfiles], function(err, res) {
        if (err) {
            resultado(err, null)
        } else {
            resultado(null, res)
        }
    })
}

Usuario.update = async function(id, editUser, resultado) {
    const sql = "UPDATE usuarios SET ? WHERE id_usuario=?"
    dbConn.query(sql, [editUser, id], function(err, res) {
        if (err) {
            resultado(err, null)
        } else {
            resultado(null, res)
        }
    })
}
Usuario.updatePassword = async function(id, password, resultado) {
    const sql = "UPDATE usuarios SET Contraseña = ? WHERE id_usuario=?"
    dbConn.query(sql, [password, id], function(err, res) {
        if (err) {
            resultado(err, null)
        } else {
            resultado(null, res)
        }
    })
}

Usuario.delete = async function(id, resultado) {
    const sql = "DELETE FROM usuarios where id_usuario = ?"
    dbConn.query(sql, parseInt(id), function(err, res) {
        if (err) {
            resultado(err, null)
        } else {
            resultado(null, res)
        }
    })
}
module.exports = Usuario