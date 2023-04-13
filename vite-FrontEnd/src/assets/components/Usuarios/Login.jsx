import React from "react";
import axios from "axios";
const URL = "https://localhost:3000/api/v1/usuarios/autenticar";

const Login = () => {
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
    inciarSesion(URL, usuario);
  }
  async function inciarSesion(url_inicioSesion, usuario) {
    await axios
      .post(url_inicioSesion, usuario, { withCredentials: true, mode: "cors" })
      .then((responseData) => {
        sessionStorage.setItem("usuario", JSON.stringify(responseData.data[0]));
        document.location.href = "index.html";
      })
      .catch((err) => alert(err.response.data.desc) /* console.log(err) */);
  }

  return (
    <div id="contedorInicioLogin" className="p-5">
      <section>
        <div className="container pt-5">
          <div className="row">
            <div className="col-12 col-sm-7 col-md-6 m-auto">
              <div className="card border-0 shadow">
                <div className="card-header d-flex justify-content-center">
                  <svg
                    className="mx-auto my-3 bi bi-person-circle"
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                  </svg>
                </div>
                <div className="card-body">
                  <form
                    id="login"
                    method="post"
                    onSubmit={handleSubmit}
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
                    />
                    <input
                      autoComplete="current-password"
                      type="password"
                      id="Contraseñ current-password"
                      className="form-control my-4 py-2"
                      name="password"
                      placeholder="Introduce tu contraseña"
                      required
                    />
                    <div className="text-center mt-3 mb-3">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value={"Inicio Sesion"}
                      ></input>
                    </div>
                  </form>
                </div>
                <div className="card-footer d-flex justify-content-center">
                  <p>
                    ¿No tienes una cuenta?{" "}
                    <a href="./registro.html">¡Regístrate!</a>
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

export default Login;
