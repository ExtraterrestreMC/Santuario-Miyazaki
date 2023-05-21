import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useForm } from "react-hook-form";

import toast, { Toaster } from "react-hot-toast";
const usuario = JSON.parse(sessionStorage.getItem("usuario"));

const URL_Bonos_Basica = `${import.meta.env.VITE_APP_BackEnd}${
  import.meta.env.VITE_APP_Bonos
}`;

const VistaAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formRef = React.useRef();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  function bonoAddSubmit(evt) {
    const formData = new FormData(formRef.current);

    const bono = Object.fromEntries(formData);

    registrar(URL_Bonos_Basica, bono);
  }

  async function registrar(URL_Bonos_Basica, bono) {
    await axios
      .post(URL_Bonos_Basica, bono, { withCredentials: true, mode: "cors" })
      .then(async (responseData) => {
        toast.success(responseData.data.info);
        setTimeout(() => {
          location.reload();
        }, 2500);
      })
      .catch((err) => toast.success(err.data.desc));
  }
  const handleShow = () => setShow(true);
  function comrobarADMINAdd() {
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
                id="URL_Bonos_Basica"
                method="POST"
                action=""
                onSubmit={handleSubmit(bonoAddSubmit)}
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
    } else {
      return <></>;
    }
  }

  return comrobarADMINAdd();
};

export default VistaAdmin;
