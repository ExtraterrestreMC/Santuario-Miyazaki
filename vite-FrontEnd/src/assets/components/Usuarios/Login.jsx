import React from "react";
import axios, { formToJSON } from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
const URL_InicioSesion = `${import.meta.env.VITE_APP_BackEnd}${
  import.meta.env.VITE_APP_Usuarios
}autenticar`;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
export default function Login() {
  const formRef = React.useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (evento) => {
    const usuario = evento;

    inciarSesion(URL_InicioSesion, usuario);
  };
  async function inciarSesion(url_inicioSesion, usuario) {
    await axios
      .post(url_inicioSesion, usuario, { withCredentials: true, mode: "cors" })
      .then((responseData) => {
        toast.success("Se iniciara session");
        sessionStorage.setItem("usuario", JSON.stringify(responseData.data[0]));

        setTimeout(() => {
          document.location.href = "/";
        }, 2500);
      })
      .catch((err) => toast.error(err.response.data.desc));
  }

  return (
    <div id="contedorInicioLogin" className="p-5">
      <section>
        <div className="container pt-5">
          <div className="row">
            <div className="col-12 col-sm-7 col-md-6 m-auto">
              <div className="card border-0 shadow">
                <div className="card-header d-flex justify-content-center">
                  <FontAwesomeIcon icon={faUser} className="iconos" />
                </div>
                <div className="card-body">
                  <form
                    id="login"
                    method="post"
                    onSubmit={handleSubmit(onSubmit)}
                    ref={formRef}
                  >
                    <input
                      type="email"
                      id="Correo"
                      autoComplete="username"
                      name="username"
                      className="form-control my-4 py-2"
                      placeholder="Introduce correo electrónico"
                      required
                      tabIndex={0}
                      {...register("username", {
                        required: {
                          value: true,
                          message: "Necesitas este campo",
                        },
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          message: "El formato no es correcto3333",
                        },
                      })}
                    />
                    {errors.username && (
                      <span className={errors.username && "mensajeError"}>
                        {errors.username.message}
                      </span>
                    )}
                    <input
                      autoComplete="current-password"
                      type="password"
                      id="Contraseñ current-password"
                      className="form-control my-4 py-2"
                      name="password"
                      placeholder="Introduce tu contraseña"
                      required
                      tabIndex={1}
                      {...register("password", {
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
                    {errors.password && (
                      <span className={errors.password && "mensajeError"}>
                        {errors.password.message}
                      </span>
                    )}
                    <div className="text-center mt-3 mb-3">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value={"Inicio Sesion"}
                        tabIndex={2}
                      ></input>
                    </div>
                  </form>
                </div>
                <div className="card-footer d-flex justify-content-center">
                  <p>
                    ¿No tienes una cuenta?{" "}
                    <a href="/registrarse" tabIndex={3}>
                      ¡Regístrate!
                    </a>
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
