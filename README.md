# TFG

Trabajo final de grado ciclo superior DAW

Realizado por Alejandro Montero Cerdan
Curso: 2 DAW

### Figma

    Enlace a figma:
    https://www.figma.com/file/2upejTr3AUhaT3ie5Hm6Jz/TFG?node-id=0%3A1&t=NwBo2qCJcyuBqzAy-1

## NPM BACKEND

    Se a instalado Express
    Se a instalado Margan
    Se a instalado fs
    Se a instalado log4js
    Se a instalado Mongo o Mysql
    Se a instalado  Bcrypt
    Se a instalado cors
    Se a instalado Express-session
    Se a instalado Cookie-parse
    Se a instalado EJS



### NPM FrontEND
    Se a instalado @emailjs/browser
    Se a instalado axios
    Se a instalado bootstrap
    Se a instalado leaflet
    Se a instalado mdb-react-ui-kit
    Se a instalado react
    Se a instalado react-bootstrap
    Se a instalado react-dom
    Se a instalado react-leaflet

### Configuracion MySQL

>*Note* :
>
> const { connect } = require("http2")
> const mysql = require("mysql")
> 
> const dbConfig = mysql.createConnection({
>     host: "*IP_Base_Datos*",
>     user: "*Usuario_Base_Datos*",
>     password: "*Password_Usuario_Base_Datos*",
>     database: "*Nombre_Base_Datos*"
> })
> 
> dbConfig.establishConexion = function () {
>     dbConfig.connect(function (err) {
>         if (err) {
>             console.log(err)
>             process.exit(0)
>         } else {
>             console.log("DB MySQL > Connected!")
>             console.log(dbConfig.state)
>         }
>     })
> }
> module.exports = dbConfig
>

### Configuracion MONGODB
>***Notes*** : 
>
>const mongoose = require("mongoose"); //por instalar
>
>const dbConfig = {
>    host: "*IP_Base_Datos_MonogoBD*",
>    port: *27017/Puerto_Base_Datos_MonogoDB*,
>    database: "*Nombre_Base_Datos_MonogoDB*"
>}
>const dbConn = {
>conectar: mongoose.connect(`mongodb://${dbConfig.>host}:${dbConfig.port}/${dbConfig.database}`)
>}
>
>module.exports = dbConn