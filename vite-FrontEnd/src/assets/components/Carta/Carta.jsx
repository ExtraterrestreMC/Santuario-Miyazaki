import React, { useEffect, useState } from "react";
import axios from "axios";
import VistaAdmin from "./VistaAdminAddPlatos";
import VistaAdminOptionsPlatos from "./VistaAdminOptionsPlatos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
const IPServidor = `${import.meta.env.VITE_APP_BackEnd}${
  import.meta.env.VITE_APP_Imagenes
}`;

const URL_Platos_Basica = `${import.meta.env.VITE_APP_BackEnd}${
  import.meta.env.VITE_APP_Platos
}`;

function PlatosList() {
  const [busqueda, setBusqueda] = useState("");
  const [platosFinal, setplatosFinal] = useState([]);
  const [platos, setPlatos] = useState([]);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    //console.log(e.target.value);
    filtro(e.target.value);
  };
  const filtro = (texto) => {
    var resultadosBusqueda = platosFinal.filter((elemento) => {
      //console.log(elemento);
      if (
        elemento.nombre.toString().toLowerCase().includes(texto.toLowerCase())
      ) {
        //console.log(elemento);
        return elemento;
      }
    });
    setPlatos(resultadosBusqueda);
  };
  const componentDidMount = async () => {
    axios.get(URL_Platos_Basica).then((response) => {
      //console.log(response);
      let platos = response.data;
      //console.log(platos);
      // platos.map((plato) => {
      //   plato.imagen = `${IPServidor}${plato._id}.jpg`;
      //   // console.log(plato.imagen);
      // });
      //console.log(platos);
      setPlatos(platos);
      setplatosFinal(platos);
      //console.log(platos);
    });
  };
  useEffect(() => {
    componentDidMount();
  }, []);
  //console.log(platos);
  //console.log(platosFinal);
  return (
    <div>
      <section id="galleryCarta" className="pt-5">
        <div className="container pt-5">
          <section className="py-2">
            <VistaAdmin usuario></VistaAdmin>
            <div className="containerInput my-4" id="divBuscador">
              <input
                className="form-control inputBuscar w-25"
                value={busqueda}
                placeholder="Búsqueda por nombre de plato"
                onChange={handleChange}
              />
              <button className="btn btn-success mx-2">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
            <h4 className="p-4 text-white border border-light rounded text-center">
              Para ver los ingredientes pase el puntero por encima
            </h4>
            <div id="mainCarta" className="container pt-5">
              {platos &&
                platos.map((plato) => (
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

export default PlatosList;
