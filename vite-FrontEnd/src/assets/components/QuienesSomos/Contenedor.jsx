import React, { Component } from "react";
import Mapa from "./mapa";
import FormularioContactanos from "./FormularioContactanos";
import { Informacion } from "./Informacion";
export class Contenedor extends Component {
  render() {
    return (
      <>
        <Mapa> </Mapa>

        <div id="conocenos">
          <FormularioContactanos></FormularioContactanos>
          <Informacion></Informacion>
        </div>
      </>
    );
  }
}

export default Contenedor;
