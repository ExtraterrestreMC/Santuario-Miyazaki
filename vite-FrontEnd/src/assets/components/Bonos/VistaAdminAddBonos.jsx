import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
const usuario = JSON.parse(sessionStorage.getItem("usuario"));

const Add_bono = "https://localhost:3000/api/v1/bonos";

const VistaAdmin = () => {
  const formRef = React.useRef();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  function bonoAddSubmit(evt) {
    evt.preventDefault();
    /*
        1. Usamos FormData para obtener la información
        2. FormData requiere la referencia del DOM,
           gracias al REF API podemos pasar esa referencia
        3. Finalmente obtenemos los datos serializados
      */
    const formData = new FormData(formRef.current);
    //console.log(formData);
    const bono = Object.fromEntries(formData);
    registrar(Add_bono, bono);
  }

  async function registrar(Add_bono, bono) {
    await axios
      .post(Add_bono, bono, { withCredentials: true, mode: "cors" })
      .then(async (responseData) => {
        alert(responseData.data.info);
        location.reload();
      })
      .catch((err) =>
        //alert(err.response.data.desc)
        console.log(err)
      );
  }
  const handleShow = () => setShow(true);
  function comrobarADMINAdd() {
    //console.log("comprobando");
    console.log(usuario);
    if (usuario != null) {
      if (usuario.id_perfiles == 1) {
        return (
          <div>
            <div className="container">
              <div className="col-md-12 text-center">
                <button
                  className="btn btn-success btn-rounded btn-lg"
                  onClick={handleShow}
                >
                  Crear bono
                </button>
              </div>
            </div>
            <Modal show={show} onHide={handleClose} animation={true}>
              <Modal.Header closeButton>
                <Modal.Title>Añadir bono</Modal.Title>
              </Modal.Header>
              <form
                id="add_bono"
                method="POST"
                action=""
                onSubmit={bonoAddSubmit}
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
    } else {
      return <></>;
    }
  }

  return comrobarADMINAdd();
};

export default VistaAdmin;
