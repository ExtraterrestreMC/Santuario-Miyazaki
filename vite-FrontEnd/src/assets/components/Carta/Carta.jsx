import React, { useState } from "react";
import axios from "axios";
import VistaAdmin from "./VistaAdminAddPlatos";
import VistaAdminOptionsPlatos from "./VistaAdminOptionsPlatos";

const URL = "https://localhost:3000/api/v1/menu";
const usuario = JSON.parse(sessionStorage.getItem("usuario"));
export default class PlatosList extends React.Component {
  state = {
    platos: [],
    usuario: usuario,
  };

  componentDidMount() {
    axios.get(URL).then((response) => {
      //console.log(response);
      let platos = response.data;
      platos.map((plato) => {
        plato.imagen = plato.imagen + "." + plato.extension;
        delete plato.extension;
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
              <div id="mainCarta" className="container pt-5">
                {this.state.platos.map((plato) => (
                  <div className="card_Platos m-4" key={plato._id}>
                    <div className='bg-image hover-overlay ripple data-mdb-ripple-color="light" cartaArriba'>
                      <img
                        src={plato.imagen}
                        alt="Imagen promocial de: Hamburguesa doble"
                        className="img-fluid"
                      ></img>
                    </div>
                    <div className="card-body cartaAbajo pt-4">
                      <div className="card-title card-title_Plato  ">
                        <h5 className="card_plato_titulo">{plato.nombre}</h5>
                      </div>
                      <hr></hr>
                      <div className="pt-5 px-4 card_plato_ctn">
                        <p>Precio: {plato.precio}€</p>
                        <p className="px-4 plato_descripcion">
                          Descripcion: {plato.descripcion}
                        </p>
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
