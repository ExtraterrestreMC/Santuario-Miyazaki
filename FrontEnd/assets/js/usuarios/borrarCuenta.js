'use strict'
let url_delete_user = url_base + "usuarios/"

window.addEventListener("load", () => {
    var usuario = JSON.parse(sessionStorage.getItem("usuario"));


})

function borrarCuenta() {
    if (confirm("¿Estás seguro de que quieras borrar tu cuenta? \nTen encuenta que se perderan todos tus datos") == true) {
        delete_user_axios(usuario.id_usuario)
    } else {
        //console.log("No");
    }
}

async function delete_user_axios(id) {

    url_delete_user += id;
    await axios.delete(url_delete_user, { withCredentials: true, mode: "cors" }, { data: id })
        .then((datosRespuesta) => {
            cerrarSesion();
        })
        .catch((err) => alert(err.response.data.desc))
}