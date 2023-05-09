# Trabajo Final Grado Superior

## **_Santuario de Miyazli_**

> #### **Descripcion**
>
> El proyecto que se realizará será la creación de un sitio web para una ciber-cafeteria gaming, donde se podrán dar de alta los usuarios y podrán ver la carta de los platos y los bonos para ver el precio de lo que costaría las horas de uso de los ordenadores del local además de información del establecimiento.
>
> Realizado por: _Alejandro Montero Cerdan_
>
> **Desarrollo Aplicaciones Web**

### Figma

    Enlace a figma:
    https://www.figma.com/file/2upejTr3AUhaT3ie5Hm6Jz/TFG?node-id=0%3A1&t=NwBo2qCJcyuBqzAy-1
    
### Trello
    Enlace a Trello:
    https://trello.com/b/3ZxJJQkP/santuario-de-miyazaki

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

> **_NOTES_** :
>
> const { connect } = require("http2")
> const mysql = require("mysql")
>
> const dbConfig = mysql.createConnection({
> host: "_IP_Base_Datos_",
> user: "_Usuario_Base_Datos_",
> password: "_Password_Usuario_Base_Datos_",
> database: "_Nombre_Base_Datos_"
> })
>
> dbConfig.establishConexion = function () {
> dbConfig.connect(function (err) {
> if (err) {
> console.log(err)
> process.exit(0)
> } else {
> console.log("DB MySQL > Connected!")
> console.log(dbConfig.state)
> }
> })
> }
> module.exports = dbConfig

### Configuracion MONGODB

> **_NOTES_** :
>
> const mongoose = require("mongoose"); //por instalar
>
> const dbConfig = {
> host: "_IP_Base_Datos_MonogoBD_",
> port: _27017/Puerto_Base_Datos_MonogoDB_,
> database: "_Nombre_Base_Datos_MonogoDB_"
> }
> const dbConn = {
> conectar: mongoose.connect(`mongodb://${dbConfig.>host}:${dbConfig.port}/${dbConfig.database}`)
> }
>
> module.exports = dbConn

### WHITELIST (Index backend)

> **_NOTES_**
>
> const whitelist = [" *IP_CLIENTE* " ]

### URL Axios (archivos FrontEnd)

> **_NOTES_**
>
> #### Usuarios
>
> const URL*Usuarios_Basica = "\_https://IP_BACKEND*/api/v1/usuarios";
>
> const URL*InicioSesion = "\_https://IP_BACKEND*/api/v1/usuarios/autenticar";
>
> const URL*CerrarSesion = "\_https://IP_BACKEND*/api/v1/usuarios/cerrarSesion";
>
> #### Platos
>
> const URL*Platos_Basica = "\_https://IP_BACKEND*/api/v1/menu";
>
> #### Bonos
>
> const URL*Bonos_Basica = "\_https://IP_BACKEND*/api/v1/bonos";

### Inicio Sesion

> **_NOTES_** >
> alejandroADM@gmail.com -> 7hJ#e2kM
> alejandroUser@gmail.com -> 7hJ#e2kM
