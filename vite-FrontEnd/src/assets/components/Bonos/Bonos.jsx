import React from "react";
import axios from "axios";

import VistaAdmin from "./VistaAdminAddBonos";

import VistaAdminBono from "./VistaAdminBono";

const URL_Bonos_Basica = `${import.meta.env.VITE_APP_BackEnd}${
  import.meta.env.VITE_APP_Bonos
}`; //,"https://localhost:3000/api/v1/bonos";

export default class BonosList extends React.Component {
  state = {
    bonos: [],
  };

  componentDidMount() {
    axios.get(URL_Bonos_Basica).then((response) => {
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
              <VistaAdmin></VistaAdmin>
              <div id="mainBonos" className="container pt-5">
                {this.state.bonos.map((bono) => (
                  <VistaAdminBono prop_bono={bono}> </VistaAdminBono>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    );
  }
}
