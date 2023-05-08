import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
const usuario = JSON.parse(sessionStorage.getItem("usuario"));
const URL_Platos_Basica = "https://localhost:3000/api/v1/menu/";

const VistaAdminOptionsPlatos = (prop_plato) => {
  //console.log(prop_plato.prop_plato._id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formRef = React.useRef();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [showDelPlato, setShowdelPlato] = useState(false);
  const handleCloseDelPlato = () => setShowdelPlato(false);
  const handleShowDelPlato = () => setShowdelPlato(true);

  function platoEditSubmit() {
    const formData = new FormData(formRef.current);
    //console.log(formData);
    const plato = Object.fromEntries(formData);
    //console.log(plato);
    plato.imagen = plato.imagen.name;
    console.log(plato);
    let urlModficada = URL_Platos_Basica + `${prop_plato.prop_plato._id}`;
    console.log(urlModficada);
    actulizarPlato(urlModficada, plato);
  }

  async function actulizarPlato(urlModficada, plato) {
    console.log(urlModficada);
    await axios
      .put(urlModficada, plato, {
        "Content-Type": "application/json;charset=UTF-8",
        withCredentials: true,
        mode: "cors",
      })
      .then(async (responseData) => {
        console.log(responseData);
        toast.success(responseData.data.info);
        setTimeout(() => {
          location.reload();
        }, 2500);
      })
      .catch((err) =>
        //alert(err.response.data.desc)
        toast.success(err.data.desc)
      ); //location.reload()); //toast.error("Se a producido un error"));
  }
  const handleShow = () => setShow(true);

  function eliminarPlato() {
    let urlModficada = URL_Platos_Basica + `${prop_plato.prop_plato._id}`;
    axios
      .delete(urlModficada, { withCredentials: true, mode: "cors" })
      .then((datosRespuesta) => {
        toast.success(datosRespuesta.data.info);
        setTimeout(() => {
          location.reload();
        }, 2500);
      })
      .catch((err) => console.log(err), toast.success(err.data.desc));
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
                onClick={handleShowDelPlato}
              >
                Borrar
              </button>
              <Modal
                show={showDelPlato}
                onHide={handleCloseDelPlato}
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
                    onClick={handleCloseDelPlato}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary text-white  mx-2"
                    id="eliminar"
                    onClick={eliminarPlato}
                  >
                    Eliminar Plato
                  </button>
                </Modal.Body>
                <Toaster></Toaster>
              </Modal>
            </div>

            <Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>Añadir Plato</Modal.Title>
              </Modal.Header>
              <form
                id="update_plato"
                method="PUT"
                action=""
                onSubmit={handleSubmit(platoEditSubmit)}
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
                      defaultValue={prop_plato.prop_plato.precio}
                      required
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
                    <input
                      type="text"
                      className="form-control"
                      id="descripcion"
                      name="descripcion"
                      placeholder="Introduce la descripcion"
                      defaultValue={prop_plato.prop_plato.descripcion}
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
                  <div className="form-group mb-2">
                    <strong>
                      <label className="mb-2">imagen:</label>
                    </strong>
                    <input
                      type="file"
                      className="form-control"
                      id="imagen"
                      name="imagen"
                      accept="image/*"
                      {...register("imagen", {
                        required: {
                          value: true,
                          message: "Necesitas este campo",
                        },
                      })}
                    />
                    {errors.imagen && (
                      <span className={errors.imagen && "mensajeError"}>
                        {errors.imagen.message}
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
                    id="añadir_plato"
                  >
                    Editar plato
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

export default VistaAdminOptionsPlatos;
