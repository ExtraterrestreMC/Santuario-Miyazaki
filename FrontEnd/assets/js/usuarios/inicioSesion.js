'use strict'
const url_inicioSesion = url_base + "usuarios/autenticar";

window.addEventListener("load", () => {
    const form_inicioSesion = document.getElementById("login")
    form_inicioSesion.addEventListener("submit", (event) => {
        event.preventDefault()
        let formData_incioSesion = new FormData(form_inicioSesion)

        let usuario = {
            Correo: formData_incioSesion.get("Correo"),
            Contraseña: formData_incioSesion.get("Contraseña"),
        }
        inciarSesion(url_inicioSesion, usuario)
    })

})

async function inciarSesion(url_inicioSesion, usuario) {
    await axios.post(url_inicioSesion, usuario, { withCredentials: true, mode: "cors" })
        .then(responseData => {
            sessionStorage.setItem('usuario', JSON.stringify(responseData.data[0]))
            document.location.href = "/FrontEnd/index.html"
        }).catch(err => alert(err.response.data.desc) /* console.log(err) */)

}