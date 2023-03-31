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
const cookieParser = require("cookie-parser")
const https = require("https");
const fs = require("fs")
//Para las sessiones
const session = require("express-session");
const sessionOptions = {
    secret: "iTF%g69M2D#w$hc&",
    cookie: {
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 24 * 1000 // == 24 h
    }
}
app.use(session(sessionOptions));

//CORS
const whitelist = ["http://127.0.0.1:5500", "http://127.0.0.1:5501", "http://127.0.0.1:5502", "http://127.0.0.1:5503", "http://127.0.0.1:5504", "http://127.0.0.1:5505", "http://127.0.0.1:5506"]
const corsOptions = {
    origin: (origin, callback) => {
        //console.log(origin);
        //console.log(origin);
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
//app.use(cors(corsOptions));
app.use(cookieParser("passwordforcookies"))


//Token
const jwtMW = require("./middlewares/jwt.mw");
const authorization = require("./middlewares/auth.mw");



app.use((req, res, next) => {
    console.log("-------use1---------");
    // console.log(req.session.token);
    // console.log(req.url);
    console.log(req.session);
    if (

        (req.url != "/api/v1/usuarios/autenticar" && req.url != "/api/v1/usuarios/autenticar/") &&
        ((req.url != "/api/v1/usuarios" && req.url != "/api/v1/usuarios/")) &&
        ((req.url != "/api/v1/cerrarSesion" && req.url != "/api/v1/cerrarSesion/"))
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
app.use((req, res, next) => {
    console.log("----------use2-------------");
    console.log(req.session);
    if (
        (req.url != "/api/v1/usuarios/autenticar" && req.url != "/api/v1/usuarios/autenticar/") &&
        ((req.url != "/api/v1/usuarios" && req.url != "/api/v1/usuarios/")) &&
        ((req.url != "/api/v1/cerrarSesion" && req.url != "/api/v1/cerrarSesion/"))
    ) {
        authorization(req, res, next)
    } else {
        if (req.method == "POST") {
            next();
        } else {
            authorization(req, res, next);
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



const httpsOptions = {
    cert: fs.readFileSync("certificadosSSL/mi_certificado.crt"),
    key: fs.readFileSync("certificadosSSL/mi_certificado.key")
}

// createServer requiere dos parámetros: un objeto (con los certificados) y express
https.createServer(httpsOptions, app).listen(port, () => {
    console.log("Servidor HTTPS escuchando en puerto " + port);
});

// app.listen(port, () => {
//     console.log(`escuchando en puerto ${port}`);
// })