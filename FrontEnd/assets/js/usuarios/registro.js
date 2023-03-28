'use strict'
const url = url_base + "usuarios";

window.addEventListener("load", () => {
    const form = document.getElementById("registro")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let formData = new FormData(form)
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
        addUser(url, usuario)
        //}
    })
})

async function addUser(url, usuario) {
    await axios.post(url, usuario, { withCredentials: true, mode: "cors" }).then(responseData => {
        //alert(responseData.data.info + ". Por favor, inicia sesión a continuación")
        console.log(responseData);
    }).catch(err =>

        //alert(err.response.data.desc)
        console.log(err)
    )
}