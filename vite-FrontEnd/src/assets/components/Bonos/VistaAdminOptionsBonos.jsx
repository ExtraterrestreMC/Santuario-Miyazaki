import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
const usuario = JSON.parse(sessionStorage.getItem("usuario"));
const URL_Bonos_Basica = "https://localhost:3000/api/v1/bonos/";

const VistaAdminOptionsbonos = (prop_bono) => {
  //console.log(prop_bono.prop_bono);
  const formRef = React.useRef();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [showDelBono, setShowDelBono] = useState(false);

  const handleCloseDelBono = () => setShowDelBono(false);
  const handleShowDelBono = () => setShowDelBono(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function bonoEditSubmit() {
    const formData = new FormData(formRef.current);
    //console.log(formData);
    const bono = Object.fromEntries(formData);
    //console.log(bono);
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
        toast.success(responseData.data.info);
        setTimeout(() => {
          location.reload();
        }, 2500);
      })
      .catch((err) => toast.error("Se a producido un error"), console.log(err));
  }
  const handleShow = () => setShow(true);

  function eliminarbono() {
    let urlModficada = URL_Bonos_Basica + `${prop_bono.prop_bono._id}`;
    axios
      .delete(urlModficada, { withCredentials: true, mode: "cors" })
      .then((datosRespuesta) => {
        toast.success(datosRespuesta.data.info);

        setTimeout(() => {
          location.reload();
        }, 2500);
      })
      .catch(
        (err) => console.log(err),
        toast.error("Se a producido un error")
        // console.log(err)
      );
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
                onClick={handleShowDelBono}
              >
                Borrar
              </button>
              <Modal
                show={showDelBono}
                onHide={handleCloseDelBono}
                animation={false}
                className="ModalEditUsuarioPassword"
              >
                <Modal.Header closeButton>
                  <Modal.Title> Eliminar Bono</Modal.Title>
                </Modal.Header>
                <Modal.Body className="ModaBodyEditPassword">
                  <button
                    type="button"
                    className="btn btn-secondary text-white mx-2"
                    id="cancelar"
                    onClick={handleCloseDelBono}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary text-white  mx-2"
                    id="eliminar"
                    onClick={eliminarbono}
                  >
                    Eliminar Bono
                  </button>
                </Modal.Body>
                <Toaster></Toaster>
              </Modal>
            </div>

            <Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>Añadir bono</Modal.Title>
              </Modal.Header>
              <form
                id="update_bono"
                method="PUT"
                action=""
                onSubmit={handleSubmit(bonoEditSubmit)}
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
                      {...register("nombre", {
                        required: {
                          value: true,
                          message: "Necesitas este campo",
                        },
                      })}
                    />
                    {errors.nombre && (
                      <span className={errors.nombre && "mensajeError"}>
                        {errors.nombre.message}
                      </span>
                    )}
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
                      // Para que solo acepte entre 2 decimales
                      step="0.01"
                      {...register("precio", {
                        required: {
                          value: true,
                          message: "Necesitas este campo",
                        },
                      })}
                    />
                    {errors.precio && (
                      <span className={errors.precio && "mensajeError"}>
                        {errors.precio.message}
                      </span>
                    )}
                  </div>
                  <div className="form-group mb-2">
                    <strong>
                      <label className="mb-2">Descripcion:</label>
                    </strong>
                    <textarea
                      className="form-control"
                      id="descripcion"
                      name="descripcion"
                      placeholder="Introduce la descripcion"
                      defaultValue={prop_bono.prop_bono.descripcion}
                      required
                      {...register("descripcion", {
                        required: {
                          value: true,
                          message: "Necesitas este campo",
                        },
                      })}
                    />
                    {errors.descripcion && (
                      <span className={errors.descripcion && "mensajeError"}>
                        {errors.descripcion.message}
                      </span>
                    )}
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
              <Toaster></Toaster>
            </Modal>
          </div>
        );
      }
    }
  }

  return comprobarAdmin();
};

export default VistaAdminOptionsbonos;
