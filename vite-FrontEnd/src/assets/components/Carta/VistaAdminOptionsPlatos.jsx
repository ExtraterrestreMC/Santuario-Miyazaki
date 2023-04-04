import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const usuario = JSON.parse(sessionStorage.getItem("usuario"));
let edit_borrar = "https://localhost:3000/api/v1/menu/";

const VistaAdminOptionsPlatos = (prop_plato) => {
  //console.log(prop_plato.prop_plato);
  const formRef = React.useRef();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  function platoEditSubmit(evt) {
    const formData = new FormData(formRef.current);
    console.log(formData);
    const plato = Object.fromEntries(formData);
    console.log(plato);
    let urlModficada = edit_borrar + `${prop_plato.prop_plato._id}`;
    actulizarPlato(urlModficada, plato);
  }

  async function actulizarPlato(urlModficada, plato) {
    console.log(urlModficada);
    await axios
      .post(urlModficada, plato, { withCredentials: true, mode: "cors" })
      .then(async (responseData) => {
        alert(responseData.data.info);
      })
      .catch((err) =>
        //alert(err.response.data.desc)
        console.log(err)
      );
  }
  const handleShow = () => setShow(true);

  function eliminarPlato() {}

  function comprobarAdmin() {
    if (usuario.id_perfiles == 1) {
      return (
        <div>
          <hr />
          <button className="mx-4" onClick={handleShow}>
            Editar
          </button>
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Añadir Plato</Modal.Title>
            </Modal.Header>
            <form
              id="add_plato"
              method="PUT"
              action=""
              onSubmit={platoEditSubmit}
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
                    placeholder="Introduce el nombre del plato"
                    defaultValue={prop_plato.prop_plato.nombre}
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
                    defaultValue={prop_plato.prop_plato.precio}
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
                    defaultValue={prop_plato.prop_plato.descripcion}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <strong>
                    <label className="mb-2">
                      URL de la imagen(sin extension):
                    </label>
                  </strong>
                  <input
                    type="text"
                    className="form-control"
                    id="imagen"
                    name="imagen"
                    placeholder="URL sin la extesion"
                    defaultValue={prop_plato.prop_plato.imagen}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <strong>
                    <label className="mb-2">Extension de la imagen:</label>
                  </strong>
                  <input
                    type="text"
                    className="form-control"
                    id="extension"
                    name="extension"
                    placeholder="Introduce su las extension de la imagen"
                    defaultValue={prop_plato.prop_plato.extension}
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
                  id="añadir_plato"
                >
                  Añadir plato
                </button>
              </div>
            </form>
          </Modal>
          <button className="mx-4" onClick={eliminarPlato()}>
            Borrar
          </button>
        </div>
      );
    }
  }

  return comprobarAdmin();
};

export default VistaAdminOptionsPlatos;
