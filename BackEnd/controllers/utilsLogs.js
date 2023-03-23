/**
 * Funciones par los logs
 * 
 * */

exports.accesoCorrecto = (usuario) => {
    return (`se ha accedido a ${usuario.Nombre} con el id ${usuario.id_usuario} `);
};
exports.errInterno = (err) => {
    return (`Ha ocurrido un error interno. Error ${err}`)
}
exports.baseDatosNoConectada = () => {
    return ("La base de datos no conectada")
}
exports.parametrosIncorrectos = () => {
    return (`Datos introducidos incorrectos`)
}
exports.parametroDucplicado = (user) => {
    return (`Datos ya existentes Correo: ${user.Correo}, DNI: ${user.DNI}`)
}
exports.faltanDatos = (nombre) => {
    return (`Faltan datos a la hora de registrar ${nombre}`)
}
exports.noExiste = (nombre) => {
    return (`El elemento ${nombre} no existe`)
}
exports.creadoCorrectamente = (nombre, id) => {
    return (`se ha creado un nuevo ${nombre} con el id ${id}`);

}

//Función para registrar cuando editamos algun elemento de la página con exito


exports.actualizadoCorrectamente = (nombre, id) => {
    return (`Se ha modificado ${nombre} con el id ${id}`)
}

//Función para registrar cuando eliminamos un elemento de la página con exito

exports.borradoCorrectamente = (nombre, id) => {
    return (`Se ha eliminado un elemento ${nombre} con el id ${id}`);
}