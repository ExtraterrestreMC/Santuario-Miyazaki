const url = url_base + "bonos";


window.addEventListener("load", () => {
    recogerMenu()
})

async function recogerMenu() {
    await axios.get(url, { withCredentials: true, mode: "cors" })
        .then((datosRespuesta) => {
            //console.log(datosRespuesta.data);
            datosRespuesta.data.forEach(dato => {
                mostrarBonos(dato)
            });
        })
        .catch((err) => {
            console.log(err);
            alert(err.response.data.desc);
        })

}

function mostrarBonos(dato) {
    console.log(dato);
    /*
     <div class="col-md-4 mb-5">
         <div class="card bg-info bg-gradient mb-3 text-center">
            <div class="card-body">
               <blockquote class="blockquote">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                  <footer>Someone famous in <cite title="Source Title">Source Title</cite></footer>
               </blockquote>
            </div>
         </div>
      </div> */
    let mainBonos = document.getElementById("mainBonos")
    let div = document.createElement("div")
    div.className = "col-md-4 mb-5"
    let card = document.createElement("div")
    card.className = "card bg-info bg-gradient mb-3 text-center"
    let div_body = document.createElement("div")
    div_body.className = "div-body"
    let h5 = document.createElement("h5")
    h5.textContent = dato.nombre
    h5.classList = "card-title font-weight-bold mx"
    let blockquote = document.createElement("blockquote")
    blockquote.className = "blockquote"
    let p = document.createElement("p")
    p.textContent = dato.descripcion
    let footer = document.createElement("footer")
    footer.textContent = dato.precio + "€"

    blockquote.appendChild(p)
    blockquote.appendChild(footer)
    div_body.appendChild(h5)
    div_body.appendChild(blockquote)
    card.appendChild(div_body)
    div.appendChild(card)
    mainBonos.appendChild(div)

}