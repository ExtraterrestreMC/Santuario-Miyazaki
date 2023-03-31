'use strict'
const url_cerrarSesion = url_base + "usuarios/cerrarSesion";

async function cerrarSesion() {
    await cerrarSesion_usuario()

}

async function cerrarSesion_usuario() {

    axios.get(url_cerrarSesion, { withCredentials: true, mode: "cors" })
        .then((datosRespuesta) => {
            //console.log(datosRespuesta);
            //console.log(sessionStorage);
            sessionStorage.removeItem("usuario")
            document.location.href = `${window.location.pathname}`

        })
        .catch((err) => {
            //console.log(err.response.data);
            alert(err.response.data.desc);
            //No has iniciado Sesion para poder salir de ella
        })
}