const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const utils = require("./controllers/utils");
const version = "v1"
app.use(express.urlencoded({ extended: true }))
app.use(express.json())




const basicRoutes = require("./routers/X.routes")

app.use(`/api/${version}/basic`, basicRoutes);


//Para las vistas
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")


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