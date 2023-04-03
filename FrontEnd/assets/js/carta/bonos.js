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

  /*
  <div class="card">
    <div class="card-header">
      Quote
    </div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p>A well-known quote, contained in a blockquote element.</p>
        <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
      </blockquote>
    </div>
  </div>

  */

  console.log(dato);
  let mainBonos = document.getElementById("mainBonos")
  let div = document.createElement("div")
  div.className = "col-lg-4 mb-4 mx-4"
  let card = document.createElement("div")
  card.className = "card w-100 p-2 "
  let div_body = document.createElement("div")
  div_body.className = "div-body"
  let div_header = document.createElement("div")
  div_header.className = "div-header text-center"
  let h5 = document.createElement("h5")
  h5.textContent = dato.nombre
  h5.classList = "card-title font-weight-bold mx"
  let blockquote = document.createElement("blockquote")
  blockquote.className = "blockquote mb-0"
  let p = document.createElement("p")
  p.textContent = dato.descripcion
  p.classList = "card-text"
  let footer = document.createElement("footer")
  footer.classList = "blockquote-footer"
  footer.textContent = dato.precio + "€"

  blockquote.appendChild(p)
  blockquote.appendChild(footer)
  div_header.appendChild(h5)
  div_body.appendChild(blockquote)
  card.appendChild(div_header)
  card.appendChild(div_body)
  div.appendChild(card)
  mainBonos.appendChild(div)

}