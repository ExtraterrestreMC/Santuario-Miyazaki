const bonosController = require("../controllers/bonos.controller")
const express = require("express")
const router = express.Router()
//const anyadirMorgan = require("../middleware/morgan.mw")


// /**
//  * Ruta para recoger todos los bonos
//  * Llamamos a los bonosController y a la funcion find_bonos
//  * Ej: //http://localhost:3000/api/v1/bonos
//  */
router.get("/", bonosController.find_bonos)

// /**
//  * Ruta para recoger el bono en espefico atraves de la id_bono
//  * Llamamos a los bonosController y a la funcion findById
//  * Ej: //http://localhost:3000/api/v1/bonos/1
//  */
router.get("/:id", bonosController.get_bono_id)

// /**
//  * Ruta para crear el bono
//  * Llamamos a los bonosController y a la funcion add_bono
//  * Ej: http://localhost:3000/api/v1/bonos {bono nuevo}
//  */
router.post("/", bonosController.add_bono)

// /**
//  * Ruta para editar el bono y atra vez del id_bono
//  * Llamamos a los bonosController y a la funcion edit_bono
//  * Ej: http://localhost:3000/api/v1/bonos/2 {id_bono + bono editado}
//  */
router.put("/:id", bonosController.edit_bono)

// /**
//  * Ruta para elimnar el bono atraves del id_bono
//  * Llamamos a los bonosController y a la funcion delete_bono
//  * Ej: http://localhost:3000/api/v1/bonos/2
//  */
router.delete("/:id", bonosController.delete_bono)

module.exports = router