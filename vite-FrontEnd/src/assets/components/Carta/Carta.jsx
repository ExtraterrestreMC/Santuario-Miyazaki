import React, { useState } from "react";
import axios from "axios";
import VistaAdmin from "./VistaAdminAddPlatos";
import VistaAdminOptionsPlatos from "./VistaAdminOptionsPlatos";
const IPServidor = `https://localhost:3000/imagen/`;

const URL_Platos_Basica = "https://localhost:3000/api/v1/menu";
const usuario = JSON.parse(sessionStorage.getItem("usuario"));
export default class PlatosList extends React.Component {
  state = {
    platos: [],
    usuario: usuario,
  };

  componentDidMount() {
    axios.get(URL_Platos_Basica).then((response) => {
      //console.log(response);
      let platos = response.data;
      //console.log(platos);
      platos.map((plato) => {
        plato.imagen = `${IPServidor}${plato._id}.jpg`;
        // console.log(plato.imagen);
      });
      //console.log(platos);
      this.setState({ platos });
    });
  }

  render() {
    return (
      <div>
        <section id="galleryCarta" className="pt-5">
          <div className="container pt-5">
            <section className="py-2">
              <VistaAdmin usuario></VistaAdmin>
              <h4>Para ver los ingredientes pase el puntero por encima</h4>
              <div id="mainCarta" className="container pt-5">
                {this.state.platos.map((plato) => (
                  <div className="card_Platos m-4" key={plato._id}>
                    <div className='bg-image hover-overlay ripple data-mdb-ripple-color="light" cartaArriba'>
                      <img
                        src={plato.imagen}
                        alt="Imagen promocial de: Hamburguesa doble"
                        className="img-fluid"
                      ></img>

                      <h5 className="card_plato_titulo">{plato.nombre}</h5>
                      <div className="card_plato_precio">
                        <h6>Precio: {plato.precio}€</h6>
                        <h6>Ingredientes</h6>
                      </div>
                    </div>
                    <div className="card-body cartaAbajo pt-4">
                      <div className="pt-1 px-4 card_plato_ctn">
                        <p className="plato_descripcion">
                          <span className="spanDescripcionPlato">
                            Descripción:{" "}
                          </span>{" "}
                          {plato.descripcion}
                        </p>
                        <hr></hr>
                        <h5>{plato.nombre}</h5>
                        <h6>Precio: {plato.precio}€</h6>
                      </div>
                      <VistaAdminOptionsPlatos
                        prop_plato={plato}
                      ></VistaAdminOptionsPlatos>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    );
  }
}
