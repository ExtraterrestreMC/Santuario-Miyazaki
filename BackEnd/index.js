const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const utils = require("./controllers/utils");
const version = "v1"
const cors = require("cors");
const AppError = require("./AppError");
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const logger = require("./Logs/logger");



//CORS
const whitelist = ["http://127.0.0.1:5500", "http://127.0.0.1:5501", "http://127.0.0.1:5502", "http://127.0.0.1:5503", "http://127.0.0.1:5504", "http://127.0.0.1:5505", "http://127.0.0.1:5506"]
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            logger.access.info("Acceso a la back desde " + origin);
            callback(null, true);
        } else {
            logger.error.fatal("Intento de acceso a la aplicación desde origen desautorizado: " + origin)
            callback(null, false);
        }
    },
    credentials: true
}

app.use(cors(corsOptions));
app.use(cookieParser("uMfgWE8FA$@&H9LW"))


//Para las sessiones
const session = require("express-session");
const jwtMW = require("./middleware/jwt.mw");
const authorization = require("./middleware/auth.mw");

const sessionOptions = {
    secret: "iTF%g69M2D#w$hc&",
    cookie: {
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 24 * 1000 // == 24 h
    }
}
app.use(session(sessionOptions));

app.use((req, res, next) => {
    if (
        (req.url != "/api/v1/usuarios/autenticar" && req.url != "/api/v1/usuarios/autenticar/") &&
        ((req.url != "/api/v1/usuarios" && req.url != "/api/v1/usuarios/"))
    ) {
        jwtMW.requireJWT(req, res, next)
    } else {
        if (req.method == "POST") {
            next();
        } else {
            jwtMW.requireJWT(req, res, next);
        }
    }
});


//const basicRoutes = require("./routers/X.routes")
const usuarioRoutes = require("./routers/usuario.routes")
const bonosRoutes = require("./routers/bonos.routes")
const platosRoutes = require("./routers/menu.routes")
//app.use(`/api/${version}/basic`, basicRoutes);
app.use(`/api/${version}/usuarios`, usuarioRoutes);
app.use(`/api/${version}/bonos`, bonosRoutes);
app.use(`/api/${version}/menu`, platosRoutes);


//Para las vistas
// app.set("views", path.join(__dirname, "views"))
// app.set("view engine", "ejs")




app.use((err, req, res, next) => {
    console.log(err);
    const { status = 500, message = utils.errInterno() } = err;
    res.status(status).send(message);
})

// Controlar rutas no existentes
app.use((req, res) => {
    throw new AppError(utils.noExiste("ruta"), 404);
})


app.listen(port, () => {
    console.log(`escuchando en puerto ${port}`);
})
