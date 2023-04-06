import React from "react";
import axios from "axios";
const URL_Creacion = "https://localhost:3000/api/v1/usuarios";

const Registro = () => {
  const formRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    /*
        1. Usamos FormData para obtener la información
        2. FormData requiere la referencia del DOM,
           gracias al REF API podemos pasar esa referencia
        3. Finalmente obtenemos los datos serializados
      */
    const formData = new FormData(formRef.current);
    console.log(formData);
    const usuario = Object.fromEntries(formData);
    registrar(URL_Creacion, usuario);
  }

  function registrar(url_registro, usuario) {
    axios
      .post(url_registro, usuario, { withCredentials: true, mode: "cors" })
      .then(async (responseData) => {
        alert(
          responseData.data.info +
            ". Se dirigira al incio de sesion a continuación"
        );
        document.location.href = "/login.html";
      })
      .catch((err) =>
        //alert(err.response.data.desc)
        console.log(err)
      );
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-user-plus"
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#2c3e50"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                      <path d="M16 11h6m-3 -3v6" />
                    </svg>
                  </div>
                </div>
                <div className="card-body">
                  <form
                    id="registro"
                    action="/"
                    method="post"
                    onSubmit={handleSubmit}
                    ref={formRef}
                  >
                    <input
                      type="text"
                      id="Nombre"
                      className="form-control my-4 py-2"
                      name="Nombre"
                      placeholder="Introduzca su nombre"
                      required
                    />
                    <input
                      type="text"
                      id="Apellidos"
                      className="form-control my-4 py-2"
                      name="Apellidos"
                      placeholder="Introduzca sus apellidos"
                      required
                    />
                    <input
                      type="email"
                      id="Correo"
                      className="form-control my-4 py-2"
                      name="Correo"
                      placeholder="Introduzca su Correo"
                      required
                    />
                    <input
                      type="password"
                      id="Contraseña"
                      className="form-control my-4 py-2"
                      name="Contraseña"
                      placeholder="Introduzca su Contraseña"
                      required
                    />
                    <input
                      type="text"
                      id="DNI"
                      name="DNI"
                      className="form-control my-4 py-2"
                      placeholder="Introduzca su DNI"
                      required
                    />
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
                    ¿Ya tienes una cuenta?{" "}
                    <a href="./InicioSesion.html">¡Inicia Sesión!</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Registro;
