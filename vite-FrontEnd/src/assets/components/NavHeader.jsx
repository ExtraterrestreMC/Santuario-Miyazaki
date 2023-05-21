import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import Home from "../../AppHome";
import Bonos from "../../AppBonos";
import Carta from "../../AppCarta";
import SobreNosotros from "../../AppQSomos";
import Usuarios from "../../AppUsuarios";
import Login from "../../AppLogin";
import Registro from "../../AppRegistro";

const usuario = JSON.parse(sessionStorage.getItem("usuario"));
const URL_cerrarSesion = `${import.meta.env.VITE_APP_BackEnd}${
  import.meta.env.VITE_APP_Usuarios
}cerrarSesion`;
const URL_Usuarios_Basica = `${import.meta.env.VITE_APP_BackEnd}${
  import.meta.env.VITE_APP_Usuarios
}`;

const borrarCuenta = (e) => {
  e.preventDefault();

  let urlBorrar = URL_Usuarios_Basica + `/${usuario.id_usuario}`;
  axios
    .delete(urlBorrar, { withCredentials: true, mode: "cors" })
    .then((datosRespuesta) => {
      sessionStorage.removeItem("usuario");
      toast.success("Se ha borrado la cuenta correctamente");
      setTimeout(() => {
        document.location.href = `${window.location.pathname}`;
      }, 2500);
    })
    .catch((err) => toast.error(err.response.data.desc));
};
const cerrarSesion = (e) => {
  e.preventDefault();
  axios
    .get(URL_cerrarSesion, { withCredentials: true, mode: "cors" })
    .then((datosRespuesta) => {
      sessionStorage.removeItem("usuario");
      document.location.href = `${window.location.pathname}`;
    })
    .catch((err) => toast.error(err.response.data.desc));
};

export const NavHeader = () => {
  function habilitar() {
    let tituloModal = document.getElementById("tituloModal");

    let nombre_user = document.getElementById("nombre_user");

    let apellido_user = document.getElementById("apellido_user");
    let correo_user = document.getElementById("correo_user");
    let DNI_user = document.getElementById("DNI_user");
    tituloModal.innerText = "Editar Usuario";
    nombre_user.removeAttribute("disabled");
    apellido_user.removeAttribute("disabled");
    correo_user.removeAttribute("disabled");
    DNI_user.removeAttribute("disabled");
  }
  const formRef = React.useRef();
  const formRefPas = React.useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showPass, setShowPass] = useState(false);

  const handleClosePass = () => setShowPass(false);
  const handleShowPass = () => setShowPass(true);

  const [showDelCuen, setShowDelCuen] = useState(false);

  const handleCloseDelCuen = () => setShowDelCuen(false);
  const handleShowDelCuen = () => setShowDelCuen(true);

  function comprobarInicioSession() {
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
                Datos
              </button>
            </li>
            <li className="nav-item  px-2 mb-1">
              <button
                className="btn btn-lg nav-link bg-dark w-100"
                id="borrarCuenta"
                onClick={handleShowDelCuen}
              >
                Borrar Cuenta
              </button>
              <Modal
                show={showDelCuen}
                onHide={handleCloseDelCuen}
                animation={false}
                className="ModalEditUsuarioPassword"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Borrar Cuenta</Modal.Title>
                </Modal.Header>
                <Modal.Body className="ModaBodyEditPassword">
                  <button
                    type="button"
                    className="btn btn-secondary text-white mx-2"
                    id="cancelar"
                    onClick={handleCloseDelCuen}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary text-white  mx-2"
                    id="eliminar"
                    onClick={borrarCuenta}
                  >
                    Borrar Cuenta
                  </button>
                </Modal.Body>
                <Toaster></Toaster>
              </Modal>
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

          <Modal
            show={show}
            onHide={handleClose}
            animation={false}
            className="ModalEditUsuario"
          >
            <Modal.Header closeButton>
              <Modal.Title id="tituloModal">Datos del usuario</Modal.Title>
            </Modal.Header>
            <form
              id="update_usuario"
              method="PUT"
              onSubmit={handleSubmit(usuarioEditSubmit)}
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
                    tabIndex={0}
                    disabled
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
                    disabled
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
                    disabled
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
                    tabIndex={4}
                    disabled
                    defaultValue={usuario.DNI}
                    {...register("DNI", {
                      required: {
                        value: true,
                        message: "Necesitas este campo",
                      },
                      pattern: {
                        value: /^\d{8}[a-zA-Z]$/,
                        message:
                          "El formato no es correcto, 8 numero y una letra",
                      },
                    })}
                  />
                  {errors.DNI && (
                    <span className={errors.DNI && "mensajeError"}>
                      {errors.DNI.message}
                    </span>
                  )}
                </div>
              </div>

              <div id="buttoneseditar" className="modal-footer">
                <button
                  className="btn btn-primary text-white"
                  id="actualizar_usuario"
                  type="submit"
                >
                  Actualizar Usuario
                </button>
                <button
                  type="button"
                  className="btn btn-secondary text-white"
                  id="editContr"
                  onClick={handleShowPass}
                >
                  Editar Contraseña
                </button>
              </div>
            </form>
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
                className="btn btn-primary text-white"
                id="habilitar_usuario"
                onClick={habilitar}
              >
                Habilitar editar usuario
              </button>
            </div>
            <Toaster></Toaster>
          </Modal>

          <Modal
            show={showPass}
            onHide={handleClosePass}
            animation={false}
            className="ModalEditUsuarioPassword"
          >
            <Modal.Header closeButton>
              <Modal.Title id="tituloModal">Editar Contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body className="ModaBodyEditPassword">
              <form
                id="update_usuario_password"
                method="PUT"
                onSubmit={handleSubmit(usuarioPassEditSubmit)}
                ref={formRefPas}
              >
                <div className="form-group mb-2">
                  <strong>
                    <label className="mb-2">Nueva constraseña:</label>
                  </strong>
                  <input
                    type="password"
                    className="form-control"
                    id="new-password"
                    name="Password"
                    placeholder="Nueva constraseña..."
                    {...register("Password", {
                      required: {
                        value: false,
                        message: "Necesitas este campo",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/i,
                        message:
                          "El formato no es correcto, Necesitas 8 numeros y una Letra",
                      },
                    })}
                  />
                  {errors.Password && (
                    <span className={errors.Password && "mensajeError"}>
                      {errors.Password.message}
                    </span>
                  )}
                </div>
                <div className="form-group mb-2">
                  <strong>
                    <label className="mb-2">Repite la constraseña:</label>
                  </strong>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    placeholder="Repite Password..."
                    {...register("newPassword", {
                      required: {
                        value: false,
                        message: "Necesitas este campo",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/i,
                        message:
                          "El formato no es correcto, Minimo 8 caracteres, algun numero y simbolos",
                      },
                    })}
                  />
                  {errors.newPassword && (
                    <span className={errors.newPassword && "mensajeError"}>
                      {errors.newPassword.message}
                    </span>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary text-white"
                    id="cancelar"
                    onClick={handleClosePass}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary text-white"
                    id="actualizar_Password"
                  >
                    Actualizar constraseña
                  </button>
                </div>
              </form>
            </Modal.Body>
            <Toaster></Toaster>
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
              <Link className="dropdown-item" to="/registrarse">
                Registro
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/login">
                Inicio Sesion
              </Link>
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
            <Link to="usuarios" className="nav-link">
              Usuarios
            </Link>
          </li>
        );
      } else {
        return null;
      }
    }
  }
  function usuarioEditSubmit(evento) {
    delete evento.Password;
    delete evento.newPassword;

    evento.id_perfiles = usuario.id_perfiles;

    let urlModficada = URL_Usuarios_Basica + `/${usuario.id_usuario}`;
    actulizarusuario(urlModficada, evento);
  }

  async function actulizarusuario(urlModficada, usuarioEdit) {
    await axios
      .put(urlModficada, usuarioEdit, {
        "Content-Type": "application/json;charset=UTF-8",
        withCredentials: true,
        mode: "cors",
      })
      .then(async (responseData) => {
        toast.success(responseData.data.info);
        usuarioEdit.Contraseña = usuario.Contraseña;
        usuarioEdit.id_usuario = usuario.id_usuario;
        sessionStorage.setItem("usuario", JSON.stringify(usuarioEdit));
      })
      .catch((err) =>
        //alert(err.response.data.desc)
        toast.error(err.response.data.desc)
      );
  }

  function usuarioPassEditSubmit(evento) {
    if (evento.Password != "" && evento.newPassword != "") {
      if (evento.Password === evento.newPassword) {
        let urlModficada =
          URL_Usuarios_Basica + `/${usuario.id_usuario}/password`;
        let constraseña = { Password: evento.Password };

        actulizarusuarioPassword(urlModficada, constraseña);
      } else {
        toast.error("No cuiciden las contraseñas");
      }
    } else {
      toast.error("Son obligatorios los campos");
    }
  }
  async function actulizarusuarioPassword(urlModficada, constraseña) {
    await axios
      .put(urlModficada, constraseña, {
        "Content-Type": "application/json;charset=UTF-8",
        withCredentials: true,
        mode: "cors",
      })
      .then(async (responseData) => {
        toast.success(responseData.data.info);
        sessionStorage.setItem("usuario", JSON.stringify(usuario));
      })
      .catch((err) => toast.success(err.data.desc));
  }

  return (
    <BrowserRouter>
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
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/menu">
                  Carta
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/bonos">
                  Bonos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacnos">
                  Sobre Nosotros
                </Link>
              </li>
              {comproAdmin()}
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">{comprobarInicioSession()}</li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route exact path="/" element={<Home></Home>} />
        <Route path="/menu" element={<Carta></Carta>} />
        <Route path="/bonos" element={<Bonos></Bonos>} />
        <Route path="/contacnos" element={<SobreNosotros></SobreNosotros>} />
        <Route path="/login" element={<Login></Login>} />
        <Route path="/registrarse" element={<Registro></Registro>} />
        <Route path="/usuarios" element={<Usuarios></Usuarios>} />
      </Routes>
    </BrowserRouter>
  );
};
