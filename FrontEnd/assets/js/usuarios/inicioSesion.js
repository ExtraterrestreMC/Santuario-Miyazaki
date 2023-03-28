'use strict'
const url = url_base + "usuarios/autenticar";

window.addEventListener("load", () => {
    const form = document.getElementById("login")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let formData = new FormData(form)

        let usuario = {
            Correo: formData.get("Correo"),
            Contraseña: formData.get("Contraseña"),
        }
        findBy_correo_and_password(url, usuario)
    })

})

async function findBy_correo_and_password(url, usuario) {
    await axios.post(url, usuario, { withCredentials: true, mode: "cors" })
        .then(responseData => {
            sessionStorage.setItem('usuario', JSON.stringify(responseData.data[0]))
            document.location.href = "./index.html"
        }).catch(err => alert(err.response.data.desc) /* console.log(err) */)

}