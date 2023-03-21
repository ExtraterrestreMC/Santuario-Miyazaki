const platosController = require("../controllers/platos.controller")
const express = require("express")
const router = express.Router()
//const anyadirMorgan = require("../middleware/morgan.mw")


/**
 * Ruta para recoger todos los platos
 * Llamamos a los platosController y a la funcion find_platos
 * Ej: //http://localhost:3000/api/v1/menu
 */
router.get("/", platosController.find_platos)

/**
 * Ruta para recoger el plato en espefico atraves de la id_plato
 * Llamamos a los platosController y a la funcion findById
 * Ej: //http://localhost:3000/api/v1/menu/1
 */
router.get("/:id", platosController.get_plato_id)

// /**
//  * Ruta para crear el plato
//  * Llamamos a los platosController y a la funcion add_plato
//  * Ej: http://localhost:3000/api/v1/menu {Plato nuevo}
//  */
router.post("/", platosController.add_plato)

// /**
//  * Ruta para editar el plato y atra vez del id_plato
//  * Llamamos a los platosController y a la funcion edit_plato
//  * Ej: http://localhost:3000/api/v1/menu/2 {id_plato + plato editado}
//  */
router.put("/:id", platosController.edit_plato)

// /**
//  * Ruta para elimnar el plato atraves del id_plato
//  * Llamamos a los platosController y a la funcion delete_plato
//  * Ej: http://localhost:3000/api/v1/menu/2
//  */
router.delete("/:id", platosController.delete_plato)

module.exports = router