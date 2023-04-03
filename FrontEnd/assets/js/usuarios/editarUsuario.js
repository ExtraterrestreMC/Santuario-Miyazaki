'use strict'

const url_editar = url_base + "usuarios";

window.addEventListener("load", () => {
    var usuario = JSON.parse(sessionStorage.getItem("usuario"));
    const update_usuario = document.getElementById("update_usuario")

    cambiarPlaceholder()
    update_usuario.addEventListener("submit", (event) => {
        event.preventDefault()
        let formData = new FormData(update_usuario)
        // if (!(erdni.test(formData.get("DNI")))) {
        //     alert("Error en el DNI")
        // } else {
        let usuarioUpdate = {
            DNI: formData.get("DNI_user"),
            Nombre: formData.get("nombre_user"),
            Apellidos: formData.get("apellido_user"),
            Correo: formData.get("correo_user"),
            Contraseña: formData.get("contraseña_user"),
            id_perfiles: usuario.id_perfiles,
        }
        console.log(usuario);
        update_usuario_Axios(usuarioUpdate, usuario.id_usuario,)


    })
})

function cambiarPlaceholder() {
    document.getElementsByName("nombre_user")[0].value = `${usuario.Nombre}`
    document.getElementsByName("apellido_user")[0].value = `${usuario.Apellidos}`
    document.getElementsByName("correo_user")[0].value = `${usuario.Correo}`
    document.getElementsByName("contraseña_user")[0].value = `*********`
    document.getElementsByName("DNI_user")[0].value = `${usuario.DNI}`
}
/**
 * Funcion para vaciar el formulario una vez que el usuario no queria guardar sus datos y volver a restablecerlos
 * como estaban antes
 */
function vaciarPlacehoder() {
    document.getElementsByName("nombre_user")[0].value = ``
    document.getElementsByName("apellido_user")[0].value = ``
    document.getElementsByName("correo_user")[0].value = ``
    document.getElementsByName("contraseña_user")[0].value = ``
    document.getElementsByName("DNI_user")[0].value = ``
    cambiarPlaceholder()
}

async function update_usuario_Axios(usuarioMod, id) {
    var url_update_usuario = url_editar;
    url_update_usuario += `/${id}`;

    await axios.put(url_update_usuario, usuarioMod, { withCredentials: true, mode: "cors" })
        .then(async (responseData) => {
            alert(responseData.data.info)
            get_usuario(id)
        }).catch((err) => {
            alert(err.response.data.desc)
        })
}
async function get_usuario(id) {
    var url_usuario = url_base + "usuarios/"
    url_usuario += id
    await axios.get(url_usuario, { withCredentials: true, mode: "cors" })
        .then(responseData => {
            sessionStorage.setItem('usuario', JSON.stringify(responseData.data[0]))
            cargarDatosUser()
        }).catch(err => alert(err.response.data.desc))

}