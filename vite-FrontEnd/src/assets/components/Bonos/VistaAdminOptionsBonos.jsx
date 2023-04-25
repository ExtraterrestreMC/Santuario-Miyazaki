import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const usuario = JSON.parse(sessionStorage.getItem("usuario"));
const URL_Bonos_Basica = "https://localhost:3000/api/v1/bonos/";

const VistaAdminOptionsbonos = (prop_bono) => {
  //console.log(prop_bono.prop_bono);
  const formRef = React.useRef();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  function bonoEditSubmit() {
    const formData = new FormData(formRef.current);
    console.log(formData);
    const bono = Object.fromEntries(formData);
    console.log(bono);
    let urlModficada = URL_Bonos_Basica + `${prop_bono.prop_bono._id}`;
    actulizarBono(urlModficada, bono);
  }

  async function actulizarBono(urlModficada, bono) {
    console.log(urlModficada);
    await axios
      .put(urlModficada, bono, {
        "Content-Type": "application/json;charset=UTF-8",
        withCredentials: true,
        mode: "cors",
      })
      .then(async (responseData) => {
        console.log(responseData.data.info);
        location.reload();
      })
      .catch((err) =>
        //alert(err.response.data.desc)
        console.log(err)
      );
  }
  const handleShow = () => setShow(true);

  function eliminarbono() {
    if (
      confirm(
        "¿Estás seguro de que quieras borrar tu cuenta? \nTen encuenta que se perderan todos tus datos"
      ) == true
    ) {
      let urlModficada = URL_Bonos_Basica + `${prop_bono.prop_bono._id}`;
      axios
        .delete(urlModficada, { withCredentials: true, mode: "cors" })
        .then((datosRespuesta) => {
          alert(datosRespuesta.data.info);
          location.reload();
        })
        .catch((err) => console.log(err));
    }
  }

  function comprobarAdmin() {
    if (usuario != null) {
      if (usuario.id_perfiles == 1) {
        return (
          <div className="mb-3">
            <hr />
            <div className="d-flex justify-content-around">
              <button
                className="btn btn-warning btn-rounded w-25"
                onClick={handleShow}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-rounded text-black w-25"
                onClick={eliminarbono}
              >
                Borrar
              </button>
            </div>

            <Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>Añadir bono</Modal.Title>
              </Modal.Header>
              <form
                id="update_bono"
                method="PUT"
                action=""
                onSubmit={bonoEditSubmit}
                ref={formRef}
              >
                <div className="modal-body">
                  <div className="form-group mb-2">
                    <strong>
                      <label className="mb-2">Nombre:</label>
                    </strong>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      placeholder="Introduce el nombre del bono"
                      defaultValue={prop_bono.prop_bono.nombre}
                      required
                    ></input>
                  </div>
                  <div className="form-group mb-2">
                    <strong>
                      <label className="mb-2">Precio:</label>
                    </strong>
                    <input
                      type="number"
                      className="form-control"
                      id="precio"
                      name="precio"
                      placeholder="Introduce su precio"
                      defaultValue={prop_bono.prop_bono.precio}
                      required
                    ></input>
                  </div>
                  <div className="form-group mb-2">
                    <strong>
                      <label className="mb-2">Descripcion:</label>
                    </strong>
                    <input
                      type="text"
                      className="form-control"
                      id="descripcion"
                      name="descripcion"
                      placeholder="Introduce la descripcion"
                      defaultValue={prop_bono.prop_bono.descripcion}
                      required
                    ></input>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary text-white"
                    id="cancelar"
                    onClick={handleClose}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary text-white"
                    id="añadir_bono"
                  >
                    Añadir bono
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        );
      }
    }
  }

  return comprobarAdmin();
};

export default VistaAdminOptionsbonos;
