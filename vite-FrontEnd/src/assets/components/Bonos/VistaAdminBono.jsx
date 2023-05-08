import React from "react";
import VistaAdminOptionsBonos from "./VistaAdminOptionsBonos";
const usuario = JSON.parse(sessionStorage.getItem("usuario"));

function noAdmin(bono) {
  return (
    <div className="card_Bonos m-4" key={bono._id}>
      <div className="carta_Bono">
        <h5 className="card-title font-weight-bold px-5 py-4">{bono.nombre}</h5>
        <div className="card-body px-5 py-4">
          <p className="mb-2">• {bono.precio}€</p>
          <p>{bono.descripcion}</p>
        </div>

        <VistaAdminOptionsBonos prop_bono={bono}></VistaAdminOptionsBonos>
      </div>
    </div>
  );
}
function VistaAdminBono(prop_bono) {
  console.log(prop_bono.prop_bono);

  if (usuario != null) {
    if (usuario.id_perfiles == 1) {
      return (
        <div className="card_Bonos m-4" key={prop_bono.prop_bono._id}>
          <div className="carta_Bono" id="bonoAdmin">
            <h5 className="card-title font-weight-bold px-5 py-4">
              {prop_bono.prop_bono.nombre}
            </h5>
            <div className="card-body px-5 py-4">
              <p className="mb-2">• {prop_bono.prop_bono.precio}€</p>
              <p>{prop_bono.prop_bono.descripcion}</p>
            </div>

            <VistaAdminOptionsBonos
              prop_bono={prop_bono}
            ></VistaAdminOptionsBonos>
          </div>
        </div>
      );
    } else {
      return noAdmin(prop_bono.prop_bono);
    }
  } else {
    return noAdmin(prop_bono.prop_bono);
  }
}
export default VistaAdminBono;
