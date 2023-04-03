var usuario = JSON.parse(sessionStorage.getItem("usuario"));

window.addEventListener("load", () => {
    console.log(usuario);
    if (comprobarInicioSession()) {
        document.getElementById("nombreUser").innerText = usuario.Nombre
    }
})

function comprobarInicioSession() {
    let iniciado = document.getElementById("Inciar")
    console.log(iniciado);
    let sinIniciar = document.getElementById("sinInciar")
    if (usuario) {
        sinIniciar.style.display = "none"
        iniciado.style.display = "block"
        return true
    } else {
        return false
    }

}