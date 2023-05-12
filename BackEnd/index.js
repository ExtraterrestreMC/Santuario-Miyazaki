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
const path = require("path")



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
const whitelist = ["http://localhost:5173", "https://localhost:5173", "http://127.0.0.1:5500", "http://127.0.0.1:5501", "http://127.0.0.1:5502"]
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




//const basicRoutes = require("./routers/X.routes")
const usuarioRoutes = require("./routers/usuario.routes")
const bonosRoutes = require("./routers/bonos.routes")
const platosRoutes = require("./routers/menu.routes")
//app.use(`/api/${version}/basic`, basicRoutes);
app.use(`/api/${version}/usuarios`, usuarioRoutes);
app.use(`/api/${version}/bonos`, bonosRoutes);
app.use(`/api/${version}/menu`, platosRoutes);

//Para imagenes del servidor
app.use(express.static('public', {
    dotfiles: 'allow',
    etag: true,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now());
        res.set('x-sent', true);
    }
}));

app.get('/imagen/:id', (req, res) => {
    const rutaImagen = `img/${req.params.id}`;
    res.sendFile(rutaImagen, { root: __dirname + '/public' });
});



app.use((err, req, res, next) => {
    console.log(err);
    const { status = 500, message = utils.errInterno() } = err;
    res.status(status).send(message);
})

// Controlar rutas no existentes
app.use((req, res) => {
    throw new AppError(utils.noExiste("ruta"), 404);
})


// Static files
app.use(express.static(path.join(__dirname, 'public')));

const httpsOptions = {
    cert: fs.readFileSync("certificadosSSL/www.SatuarioMiyazaki.com+2.crt"),
    key: fs.readFileSync("certificadosSSL/www.SatuarioMiyazaki.com+2-key.key")
}

// createServer requiere dos parámetros: un objeto (con los certificados) y express
https.createServer(httpsOptions, app).listen(port, () => {
    console.log("Servidor HTTPS escuchando en puerto " + port);
});

// app.listen(port, () => {
//     console.log(`escuchando en puerto ${port}`);
// })