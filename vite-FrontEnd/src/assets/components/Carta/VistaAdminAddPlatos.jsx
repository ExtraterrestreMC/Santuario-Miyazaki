import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
const usuario = JSON.parse(sessionStorage.getItem("usuario"));
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
const URL_Platos_Basica = "https://localhost:3000/api/v1/menu";

const VistaAdmin = () => {
  const formRef = React.useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  function platoAddSubmit(evento) {
    //console.log(evento);
    /*
        1. Usamos FormData para obtener la información
        2. FormData requiere la referencia del DOM,
           gracias al REF API podemos pasar esa referencia
        3. Finalmente obtenemos los datos serializados
      */
    const plato = evento;
    //console.log(plato.imagen[0]);
    plato.imagen = plato.imagen[0].name;
    //console.log(plato.imagen);
    // const formData = new FormData(formRef.current);
    // console.log(formData);
    // const plato = Object.fromEntries(formData);
    //console.log(plato);
    registrar(URL_Platos_Basica, plato);
  }

  async function registrar(URL_Platos_Basica, plato) {
    await axios
      .post(URL_Platos_Basica, plato, { withCredentials: true, mode: "cors" })
      .then(async (responseData) => {
        toast.success(responseData.data.info);
        setTimeout(() => {
          location.reload();
        }, 2500);
      })
      .catch((err) => toast.error("Se a producido un error"), console.log(err));
  }
  const handleShow = () => setShow(true);
  function comrobarADMINAdd() {
    //console.log("comprobando");
    //console.log(usuario);
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
                  Crear plato
                </button>
              </div>
            </div>
            <Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>Añadir Plato</Modal.Title>
              </Modal.Header>
              <form
                method="POST"
                action=""
                onSubmit={handleSubmit(platoAddSubmit)}
                ref={formRef}
                // enctype="multipart/form-data"
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
                    <textarea
                      type="text"
                      className="form-control"
                      id="descripcion"
                      name="descripcion"
                      placeholder="Introduce la descripcion"
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
                    Añadir plato
                  </button>
                </div>
              </form>
              <Toaster></Toaster>
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
