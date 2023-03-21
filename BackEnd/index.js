const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const utils = require("./controllers/utils");
const version = "v1"
const cors = require("cors");
const AppError = require("./AppError");
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());



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