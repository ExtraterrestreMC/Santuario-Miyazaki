import React from "react";
import axios from "axios";

import VistaAdmin from "./VistaAdminAddBonos";
import VistaAdminOptionsPlatos from "./VistaAdminOptionsBonos";

const URL_Bonos_Basica = "https://localhost:3000/api/v1/bonos";

export default class BonosList extends React.Component {
  state = {
    bonos: [],
  };

  componentDidMount() {
    axios.get(URL_Bonos_Basica).then((response) => {
      //console.log(response);
      let bonos = response.data;
      this.setState({ bonos });
    });
  }

  render() {
    return (
      <div>
        <section id="galleryBonos" className="pt-5">
          <div className="container pt-5">
            <section className="py-2">
              <VistaAdmin usuario></VistaAdmin>
              <div id="mainBonos" className="container pt-5">
                {this.state.bonos.map((bono) => (
                  <div className="card_Bonos m-4" key={bono._id}>
                    <div className="carta_Bono">
                      <h5 className="card-title font-weight-bold px-5 py-4">
                        {bono.nombre}
                      </h5>
                      <div className="card-body px-5 py-4">
                        <p className="mb-2">• {bono.precio}€</p>
                        <p>{bono.descripcion}</p>
                      </div>

                      <VistaAdminOptionsPlatos
                        prop_bono={bono}
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
