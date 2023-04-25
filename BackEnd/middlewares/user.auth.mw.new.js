let ID_ADMIN = 1
let ID_USER = 2
let ID_Invitados = 3


//Middleware de autorización
const authorizationnew = async (req, res, next) => {
    console.log("New Auth");
    const { id } = req.params
    // console.log(id);
    // console.log(req.session.usuario[0]);
    if (req.session && req.session.usuario) {
        if (req.session.usuario[0].id_perfiles === ID_ADMIN) {
            // Si el usuario es administrador, puede acceder a todo
            //console.log("asdasd");
            next();
        } else if (req.session.usuario[0].id_perfiles === ID_USER) {
            // Si el usuario es nivel usuario, puede acceder a todo excepto al GET de la ruta solo permitida a administradores y a los POST/PUT/Delete de platos y bonos
            console.log(id);
            console.log(req.session.usuario[0]);
            if (id == req.session.usuario[0].id_usuario) {
                next()
            } else {
                res.status(401).json({ codError: 401, desc: "No se puedes acceder a otro usuario" })
            }
        } else if (req.session.usuario[0].id_perfiles === ID_Invitados) {
            // Si el usuario es invitado, solo puede acceder a ciertas rutas y solo con métodos GET
            res.status(401).json({ codError: 401, desc: "No se puede realizar accion, si nunca has iniciado una" })
        }
    } else {

        res.status(401).json({ codError: 401, desc: "No se puede realizar accion, si nunca has iniciado una" })

    }
}


module.exports = authorizationnew;