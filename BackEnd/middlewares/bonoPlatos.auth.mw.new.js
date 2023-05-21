let ID_ADMIN = 1
let ID_USER = 2
let ID_Invitados = 3


//Middleware de autorización
const authorizationnew = async (req, res, next) => {

    const { id } = req.params

    if (req.session && req.session.usuario) {
        if (req.session.usuario[0].id_perfiles === ID_ADMIN) {
            // Si el usuario es administrador, puede acceder a todo
            next();
        } else {
            res.status(401).json({ codError: 401, desc: "No se puede realizar accion, No eres administrador" })
        }
    } else {

        res.status(401).json({ codError: 401, desc: "No se puede realizar accion, si nunca has iniciado una" })

    }
}


module.exports = authorizationnew;