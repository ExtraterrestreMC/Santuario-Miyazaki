'use strict'
const url_registro = url_base + "usuarios";
const url_InicioSesion = url_base + "usuarios/autenticar";
window.addEventListener("load", () => {
    const form_registro = document.getElementById("registro")
    form_registro.addEventListener("submit", (event) => {
        event.preventDefault()
        let formData = new FormData(form_registro)
        // if (!(erdni.test(formData.get("DNI")))) {
        //     alert("Error en el DNI")
        // } else {
        let usuario = {
            DNI: formData.get("DNI"),
            Nombre: formData.get("Nombre"),
            Apellidos: formData.get("Apellidos"),
            Correo: formData.get("Correo"),
            Contraseña: formData.get("Contraseña"),
            id_perfiles: 2
        }
        console.log(usuario);
        addUser(url_registro, usuario)


    })
})

async function addUser(url_registro, usuario) {
    await axios.post(url_registro, usuario, { withCredentials: true, mode: "cors" }).then(async responseData => {
        alert(responseData.data.info + ". Se dirigira al incio de sesion a continuación")
        document.location.href = "/FrontEnd/InicioSesion.html"
    }).catch(err =>
        //alert(err.response.data.desc)
        console.log(err)
    )
}