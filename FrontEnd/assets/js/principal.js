var usuario = JSON.parse(sessionStorage.getItem("usuario"));

window.addEventListener("load", () => {
    console.log(usuario);
})