import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { read } from "@popperjs/core";

const usuario = JSON.parse(sessionStorage.getItem("usuario"));
const URL_cerrarSesion = "https://localhost:3000/api/v1/usuarios/cerrarSesion";
const URL_Usuarios_Basica = "https://localhost:3000/api/v1/usuarios";

const borrarCuenta = (e) => {
  e.preventDefault();
  if (
    confirm(
      "¿Estás seguro de que quieras borrar tu cuenta? \nTen encuenta que se perderan todos tus datos"
    ) == true
  ) {
    let urlBorrar = URL_Usuarios_Basica + `${usuario.id_usuario}`;
    axios
      .delete(urlBorrar, { withCredentials: true, mode: "cors" })
      .then((datosRespuesta) => {
        //console.log(datosRespuesta);
        sessionStorage.removeItem("usuario");
        document.location.href = `${window.location.pathname}`;
      })
      .catch((err) => alert(err.response.data.desc));
  } else {
    //console.log("No");
  }
};
const cerrarSesion = (e) => {
  e.preventDefault();
  axios
    .get(URL_cerrarSesion, { withCredentials: true, mode: "cors" })
    .then((datosRespuesta) => {
      //console.log(datosRespuesta);
      //console.log(sessionStorage);
      sessionStorage.removeItem("usuario");
      document.location.href = `${window.location.pathname}`;
    })
    .catch((err) => {
      //console.log(err.response.data);
      alert(err.response.data.desc);
      //No has iniciado Sesion para poder salir de ella
    });
};

export const NavHeader = () => {
  //console.log(usuario);
  const formRef = React.useRef();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function comprobarInicioSession() {
    //console.log("he entrado");
    if (usuario) {
      return (
        <div id="Inciar">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            id="nombreUser"
          >
            {usuario.Nombre}
          </a>
          <ul className="dropdown-menu" id="ul_Inciar">
            <li className="nav-item px-2 mb-1">
              <button
                className="btn btn-lg nav-link bg-dark w-100  "
                id="editarUser"
                onClick={handleShow}
              >
                Editar
              </button>
            </li>
            <li className="nav-item  px-2 mb-1">
              <button
                className="btn btn-lg nav-link bg-dark w-100"
                id="borrarCuenta"
                onClick={borrarCuenta}
              >
                Borrar Cuenta
              </button>
            </li>
            <li className="nav-item  px-2 mb-1">
              <button
                className="btn btn-lg nav-link bg-dark w-100"
                id="cerrarSesion"
                onClick={cerrarSesion}
              >
                Cerrar Sesion
              </button>
            </li>
          </ul>
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>Edita un usuario</Modal.Title>
            </Modal.Header>
            <form
              id="update_usuario"
              method="PUT"
              onSubmit={usuarioEditSubmit}
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
                    id="nombre_user"
                    name="Nombre"
                    placeholder="Introduce su nombre"
                    defaultValue={usuario.Nombre}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <strong>
                    <label className="mb-2">Apellido:</label>
                  </strong>
                  <input
                    type="text"
                    className="form-control"
                    id="apellido_user"
                    name="Apellidos"
                    placeholder="Introduce su apellido"
                    defaultValue={usuario.Apellidos}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <strong>
                    <label className="mb-2">Correo:</label>
                  </strong>
                  <input
                    type="email"
                    className="form-control"
                    id="correo_user"
                    name="Correo"
                    placeholder="Introduce su correo electronico"
                    defaultValue={usuario.Correo}
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <strong>
                    <label className="mb-2">Contraseña:</label>
                  </strong>
                  <input
                    type="password"
                    className="form-control"
                    id="contraseña_user"
                    name="Contraseña"
                    placeholder="Introduce su contraseña"
                    defaultValue="*******"
                    required
                  ></input>
                </div>
                <div className="form-group mb-2">
                  <strong>
                    <label className="mb-2">DNI:</label>
                  </strong>
                  <input
                    type="text"
                    className="form-control"
                    id="DNI_user"
                    name="DNI"
                    placeholder="Introduce su DNI"
                    required
                    defaultValue={usuario.DNI}
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
                  id="actualizar_usuario"
                >
                  Actualizar Usuario
                </button>
              </div>
            </form>
          </Modal>
        </div>
      );
    } else {
      return (
        <div id="sinInciar">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
          >
            Registro/Inicio Sesion
          </a>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="registro.html">
                Registro
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="login.html">
                Inicio Sesion
              </a>
            </li>
          </ul>
        </div>
      );
    }
  }

  function comproAdmin() {
    if (usuario) {
      if (usuario.id_perfiles == 1) {
        return (
          <li className="nav-item">
            <a className="nav-link" href="usuarios.html">
              Usuarios
            </a>
          </li>
        );
      } else {
        return null;
      }
    }
  }
  function usuarioEditSubmit() {
    const formData = new FormData(formRef.current);
    console.log(formData);
    const usuarioForm = Object.fromEntries(formData);
    if (usuarioForm.Contraseña == "*******") {
      usuarioForm.Contraseña = usuario.Contraseña;
    }
    usuarioForm.id_perfiles = usuario.id_perfiles;

    //console.log(usuario);
    let urlModficada = URL_Usuarios_Basica + `${usuario.id_usuario}`;
    actulizarusuario(urlModficada, usuarioForm);
  }

  async function actulizarusuario(urlModficada, usuario) {
    console.log(urlModficada);
    await axios
      .put(urlModficada, usuario, {
        "Content-Type": "application/json;charset=UTF-8",
        withCredentials: true,
        mode: "cors",
      })
      .then(async (responseData) => {
        sessionStorage.setItem("usuario", JSON.stringify(usuario));
      })
      .catch((err) =>
        //alert(err.response.data.desc)
        console.log(err)
      );
  }

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <img
            src="logo_transparent_blanco.png"
            alt="imagen logo transparente"
            className="navbar-brand"
            id="logoTransparente"
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mynavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <a className="nav-link" href="index.html">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="Carta.html">
                  Carta
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="bonos.html">
                  Bonos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="quienesSomos.html">
                  Sobre Nosotros
                </a>
              </li>
              {comproAdmin()}
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">{comprobarInicioSession()}</li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
