import React, { useState } from "react";
import axios from "axios";
import VistaAdmin from "./VistaAdminAddPlatos";
import VistaAdminOptionsPlatos from "./VistaAdminOptionsPlatos";

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
        <section id="gallery" className="pt-5">
          <div className="container pt-5">
            <section className="py-2">
              <VistaAdmin usuario></VistaAdmin>
              <div id="mainCarta" className="container pt-5">
                {this.state.platos.map((plato) => (
                  <div className="card m-4" key={plato._id}>
                    <div className='bg-image hover-overlay ripple data-mdb-ripple-color="light"'>
                      <img
                        src={plato.imagen}
                        alt="Imagen promocial de: Hamburguesa doble"
                        className="img-fluid"
                      ></img>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title font-weight-bold mx">
                        {plato.nombre}
                      </h5>
                      <p className="mb-2">• {plato.precio}€</p>
                      <hr></hr>
                      <p>{plato.descripcion}</p>
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
