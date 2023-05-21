import React from "react";
import axios from "axios";
const URL_Creacion = `${import.meta.env.VITE_APP_BackEnd}${
  import.meta.env.VITE_APP_Usuarios
}`;
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function Registro() {
  const formRef = React.useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function onSubmit(evento) {
    const usuario = evento;
    registrar(URL_Creacion, usuario);
  }

  function registrar(url_registro, usuario) {
    axios
      .post(url_registro, usuario, { withCredentials: true, mode: "cors" })
      .then(async (responseData) => {
        toast.success(
          responseData.data.info +
            ". \n Se dirigira al incio de sesion a continuación"
        );
        setTimeout(() => {
          document.location.href = "/login";
        }, 2500);
      })
      .catch((err) => toast.error(err.response.data.desc));
  }
  return (
    <div id="contedorInicio">
      <section>
        <div className="container pt-5">
          <div div className="row">
            <div className="col-12 col-sm-7 col-md-6 m-auto">
              <div className="card border-0 shadow">
                <div className="card-header d-flex justify-content-center">
                  <div id="icono">
                    <FontAwesomeIcon icon={faUserPlus} className="iconos" />
                  </div>
                </div>
                <div className="card-body">
                  <form
                    id="registro"
                    action="/"
                    method="post"
                    onSubmit={handleSubmit(onSubmit)}
                    ref={formRef}
                  >
                    <input
                      type="text"
                      id="Nombre"
                      className="form-control my-4 py-2"
                      name="Nombre"
                      placeholder="Introduzca su nombre"
                      required
                      tabIndex={0}
                      {...register("Nombre", {
                        required: {
                          value: true,
                          message: "Necesitas este campo",
                        },
                      })}
                    />
                    {errors.Nombre && (
                      <span className={errors.Nombre && "mensajeError"}>
                        {errors.Nombre.message}
                      </span>
                    )}
                    <input
                      type="text"
                      id="Apellidos"
                      className="form-control my-4 py-2"
                      name="Apellidos"
                      placeholder="Introduzca sus apellidos"
                      required
                      tabIndex={1}
                      {...register("Apellidos", {
                        required: {
                          value: true,
                          message: "Necesitas este campo",
                        },
                      })}
                    />
                    {errors.Apellidos && (
                      <span className={errors.Apellidos && "mensajeError"}>
                        {errors.Apellidos.message}
                      </span>
                    )}
                    <input
                      type="email"
                      id="Correo"
                      className="form-control my-4 py-2"
                      name="Correo"
                      placeholder="Introduzca su Correo"
                      required
                      tabIndex={2}
                      {...register("Correo", {
                        required: {
                          value: true,
                          message: "Necesitas este campo",
                        },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "El formato no es correcto",
                        },
                      })}
                    />
                    {errors.Correo && (
                      <span className={errors.Correo && "mensajeError"}>
                        {errors.Correo.message}
                      </span>
                    )}
                    <input
                      type="password"
                      id="Contraseña"
                      className="form-control my-4 py-2"
                      name="Contraseña"
                      placeholder="Introduzca su Contraseña"
                      required
                      tabIndex={3}
                      {...register("Contraseña", {
                        required: {
                          value: true,
                          message: "Necesitas este campo",
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/i,
                          message: "El formato no es correcto",
                        },
                      })}
                    />
                    {errors.Contraseña && (
                      <span className={errors.Contraseña && "mensajeError"}>
                        {errors.Contraseña.message}
                      </span>
                    )}
                    <input
                      type="text"
                      id="DNI"
                      name="DNI"
                      className="form-control my-4 py-2"
                      placeholder="Introduzca su DNI"
                      required
                      tabIndex={4}
                      {...register("DNI", {
                        required: {
                          value: true,
                          message: "Necesitas este campo",
                        },
                        pattern: {
                          value: /^\d{8}[a-zA-Z]$/,
                          message: "El formato no es correcto",
                        },
                      })}
                    />
                    {errors.DNI && (
                      <span className={errors.DNI && "mensajeError"}>
                        {errors.DNI.message}
                      </span>
                    )}
                    <div className="text-center mt-3 mb-3">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value={"Registrate"}
                      ></input>
                    </div>
                  </form>
                </div>
                <div className="card-footer d-flex justify-content-center">
                  <p>
                    ¿Ya tienes una cuenta? <a href="/login">¡Inicia Sesión!</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toaster></Toaster>
      </section>
    </div>
  );
}
