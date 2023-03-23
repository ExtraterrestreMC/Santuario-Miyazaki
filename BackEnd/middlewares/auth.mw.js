let ID_ADMIN=1
let ID_USER=2
let ID_Invitados=3


const RUTA_Admin = "/api/v1/usuarios"
const RUTAS_Permitidas = ["/api/v1/menu", "/api/v1/bonos"]

//Middleware de autorización
const authorization = async (req, res, next) => {
    if (req.session && req.session.usuario) {
        if (req.session.usuario[0].id_profiles === ID_ADMIN) {
            // Si el usuario es administrador, puede acceder a todo
            next();
        }
        else if (req.session.usuario[0].id_profiles === ID_USER) {
            // Si el usuario es nivel usuario, puede acceder a todo excepto al GET de la ruta solo permitida a administradores y a los POST/PUT/Delete de platos y bonos
            if ((req._parsedOriginalUrl.path === RUTA_SOLO_ADMINS && req.method === "GET") || (RUTAS_Permitidas.includes(req._parsedOriginalUrl.path) !== "GET") ) {
                res.status(401).json({ codError: 401, desc: "No eres administrador" })
            } else {
                next();
            }
        }
        else if (req.session.usuario[0].id_profiles === ID_Invitados) {
            // Si el usuario es invitado, solo puede acceder a ciertas rutas y solo con métodos GET
            if ((req.method === "GET" && RUTAS_Permitidas.includes(req._parsedOriginalUrl.path))) {
                next();
            } else {
                res.status(401).json({codError: 401, desc: "No tienes permisos"})
            }
        }
    } else {
        res.status(401).json({codError: 401, desc: "No tienes permisos. Identifícate primero"})
    }
}


module.exports = authorization;
