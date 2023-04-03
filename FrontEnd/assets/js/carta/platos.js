const url = url_base + "menu";


window.addEventListener("load", () => {
    recogerMenu()
})

async function recogerMenu() {
    await axios.get(url, { withCredentials: true, mode: "cors" })
        .then((datosRespuesta) => {
            console.log();
            datosRespuesta.data.forEach(dato => {
                mostrarCarta(dato)
            });
        })
        .catch((err) => {
            console.log(err);
            alert(err.response.data.desc);
        })

}

function mostrarCarta(dato) {
    let mainCarta = document.getElementById("mainCarta")
    let card = document.createElement("div")
    card.className = "card m-4"
    card.id = dato._id
    card.style.width = "20rem"

    let div_img = document.createElement("div")
    let img = document.createElement("img")
    img.src = dato.imagen + "." + dato.extension
    img.alt = "Imagen promocial de: " + dato.nombre
    img.classList = "img-fluid"
    div_img.appendChild(img)
    div_img.classList = `"bg-image hover-overlay ripple" data-mdb-ripple-color="light"`

    let div_text = document.createElement("div")
    div_text.classList = "card-body"
    let h5 = document.createElement("h5")
    h5.textContent = dato.nombre
    h5.classList = "card-title font-weight-bold mx"
    let p_precio = document.createElement("p")
    p_precio.className = "mb-2"
    p_precio.textContent = `• ${dato.precio}€`
    let p_descripcion = document.createElement("p")
    p_descripcion.textContent = dato.descripcion
    let hr = document.createElement("hr")
    hr.classList = "my-4"

    div_text.appendChild(h5)
    div_text.appendChild(p_precio)
    div_text.appendChild(hr)
    div_text.appendChild(p_descripcion)

    card.appendChild(div_img)
    card.appendChild(div_text)
    mainCarta.appendChild(card)


    // let precio = document.createElement("h4")
    // precio.textContent = dato.precio

    // let descripcion = document.createElement("button")
    // descripcion.textContent = "Mas destalles"
    // let enlace = document.createElement("a")
    // enlace.href = url + "/" + dato._id
    // enlace.appendChild(descripcion)

    // div.appendChild(div_img)
    // div.appendChild(h3)
    // div.appendChild(precio)
    // div.appendChild(enlace)
    // mainCarta.appendChild(div)

}

function mas_destalles() {
    console.log("hola");
}