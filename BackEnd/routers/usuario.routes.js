const userController = require("../controllers/usuarios.controller")
const express = require("express")
const router = express.Router()
var cors = require("cors");
//const anyadirMorgan = require("../middleware/morgan.mw")


//  variable que se aplica en el cors para que acepte unicamente la ruta del frontend ("http://127.0.0.1:5000") 
//  Cors con la configuracion corsOptions ( cors(corsOption) ) introduce la dirección en el header Access-Control-Allow-Origin, 
//  pero aunque coincidan la direción de origin y la dirección del cliente no acepta la conexion.
// var corsOptions = {
//     origin: "http://127.0.0.1:5000",
//     optionsSuccessStatus: 200
// }
/**
 * Ruta para recoger todos los usuarios
 * Llamamos a los userController y a la funcion find_usuarios
 * Ej: //http://localhost:3000/api/v1/usuarios
 */
router.get("/", userController.find_usuarios)

/**
 * Ruta para recoger el usuario en espefico atraves de la id_usuario
 * Llamamos a los userController y a la funcion findById
 * Ej: //http://localhost:3000/api/v1/usuarios/1
 */
router.get("/:id", userController.findById)

/**
 * Ruta la cual sirve para poder cerrar session  de un usuario
 * Llamamos a los userController y a la función logout_usuario
 * Ej: //http://localhost:3000/api/v1/usuarios/logout
 */
//router.post("/logout".logout_usuario)

/**
 * Ruta para recoger el usuario en espefico atraves del correo y la contraseña
 * Llamamos a los userController y a la funcion findBy_correo_and_password
 * Ej: http://localhost:3000/api/v1/usuarios/autenticar {Se pasann los datos atras vez de json}
 */
router.post("/autenticar", userController.findInicioSesion)

/**
 * Ruta para crear el usuario
 * Llamamos a los userController y a la funcion add_usuario
 * Ej: http://localhost:3000/api/v1/usuarios {Usuario nuevo}
 */
router.post("/", userController.add_usuario)

/**
 * Ruta para editar el usuario y atra vez del id_usuario
 * Llamamos a los userController y a la funcion edit_usuario
 * Ej: http://localhost:3000/api/v1/usuarios/2 {id_usuario + Usuario editado}
 */
//http://localhost:3000/api/v1/usuarios/2
router.put("/:id", userController.edit_usuario)

/**
 * Ruta para elimnar el usuario atraves del id_usuario
 * Llamamos a los userController y a la funcion delete_usuario
 * Ej: http://localhost:3000/api/v1/usuarios/2
 */
router.delete("/:id", userController.delete_usuario)


/**
 * Exportamos Router para poder usarlo  en otros archivos
 */
module.exports = router