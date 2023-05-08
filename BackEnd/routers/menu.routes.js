const platosController = require("../controllers/platos.controller")
const express = require("express")
const router = express.Router()
const anyadirMorgan = require("../middlewares/morgan.mw")
const authorizationnew = require("../middlewares/bonoPlatos.auth.mw.new");
const jwtMW = require("../middlewares/jwt.mw.new")



/**
 * Ruta para recoger todos los platos
 * Llamamos a los platosController y a la funcion find_platos
 * Ej: //http://localhost:3000/api/v1/menu
 */
router.get("/", anyadirMorgan, platosController.find_platos)

/**
 * Ruta para recoger el plato en espefico atraves de la id_plato
 * Llamamos a los platosController y a la funcion findById
 * Ej: //http://localhost:3000/api/v1/menu/1
 */
router.get("/:id", anyadirMorgan, platosController.get_plato_id)

// /**
//  * Ruta para crear el plato
//  * Llamamos a los platosController y a la funcion add_plato
//  * Ej: http://localhost:3000/api/v1/menu {Plato nuevo}
//  */
router.post("/", jwtMW.requireJWT, authorizationnew, anyadirMorgan, platosController.add_plato)

// /**
//  * Ruta para editar el plato y atra vez del id_plato
//  * Llamamos a los platosController y a la funcion edit_plato
//  * Ej: http://localhost:3000/api/v1/menu/2 {id_plato + plato editado}
//  */
router.put("/:id", jwtMW.requireJWT, authorizationnew, anyadirMorgan, platosController.edit_plato)

// /**
//  * Ruta para elimnar el plato atraves del id_plato
//  * Llamamos a los platosController y a la funcion delete_plato
//  * Ej: http://localhost:3000/api/v1/menu/2
//  */
router.delete("/:id", jwtMW.requireJWT, authorizationnew, anyadirMorgan, platosController.delete_plato)

module.exports = router