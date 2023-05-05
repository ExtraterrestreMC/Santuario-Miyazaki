import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
const usuarioJSON = JSON.parse(sessionStorage.getItem("usuario"));
let URL_Usuarios_Basica = "https://localhost:3000/api/v1/usuarios";

const VistaAdminOptionsusuarios = (prop_Usuario) => {
  const formRef = React.useRef();
  const formRefPas = React.useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedOption, setSelectedOption] = useState(
    prop_Usuario.prop_usuario.id_perfiles
  );

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.defaultValue);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [showPass, setShowPass] = useState(false);

  const handleClosePass = () => setShowPass(false);
  const handleShowPass = () => setShowPass(true);

  const [showDelCuen, setShowDelCuen] = useState(false);

  const handleCloseDelCuen = () => setShowDelCuen(false);
  const handleShowDelCuen = () => setShowDelCuen(true);

  function usuarioEditSubmit(evento) {
    console.log(evento);
    delete evento.Password;
    delete evento.Password;
    evento.id_perfiles = prop_Usuario.prop_usuario.id_perfiles;
    //   const usuario = Object.fromEntries(formData);

    let urlModficada =
      URL_Usuarios_Basica + `/${prop_Usuario.prop_usuario.id_usuario}`;
    actulizarusuario(urlModficada, evento);
    // }
    console.log(evento);
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
        toast.success(responseData.data.info);
        location.reload();
      })
      .catch((err) =>
        //alert(err.response.data.desc)
        toast.success(err.data.desc)
      );
  }
  function usuarioPassEditSubmit(evento) {
    console.log(evento);
    //console.log(constraseña);

    if (evento.Password != "" && evento.newPassword != "") {
      if (evento.Password === evento.newPassword) {
        let urlModficada =
          URL_Usuarios_Basica + `/${usuario.id_usuario}/password`;
        let constraseña = { Password: evento.Password };
        //console.log(constraseña);
        actulizarusuarioPassword(urlModficada, constraseña);
      } else {
        toast.error("No cuiciden las contraseñas");
      }
    } else {
      toast.error("Son obligatorios los campos");
    }
  }
  async function actulizarusuarioPassword(urlModficada, constraseña) {
    console.log(urlModficada);
    await axios
      .put(urlModficada, constraseña, {
        "Content-Type": "application/json;charset=UTF-8",
        withCredentials: true,
        mode: "cors",
      })
      .then(async (responseData) => {
        toast.success(responseData.data.info);
        setTimeout(() => {
          document.location.href = `${window.location.pathname}`;
        }, 2500);
      })
      .catch((err) =>
        //alert(err.response.data.desc)
        toast.success(err.data.desc)
      );
  }

  const handleShow = () => setShow(true);

  function eliminarusuario() {
    let urlModficada =
      URL_Usuarios_Basica + `/${prop_Usuario.prop_usuario.id_usuario}`;
    axios
      .delete(urlModficada, {
        "Content-Type": "application/json;charset=UTF-8",
        withCredentials: true,
        mode: "cors",
      })
      .then((datosRespuesta) => {
        toast.success("Se ha borrado la cuenta correctamente");
        setTimeout(() => {
          document.location.href = `${window.location.pathname}`;
        }, 2500);
      })
      .catch((err) => console.log(err));
  }

  function comprobarAdmin() {
    return (
      <div className="btn-group">
        <button className=" btn btn-warning btn-rounded " onClick={handleShow}>
          Editar
        </button>

        <button
          className="btn btn-danger btn-rounded text-black mx-2"
          onClick={handleShowDelCuen}
        >
          Borrar
        </button>
        <Modal
          show={showDelCuen}
          onHide={handleCloseDelCuen}
          animation={false}
          className="ModaldeleteCuenta"
        >
          <Modal.Header closeButton>
            <Modal.Title>Borrar Cuenta</Modal.Title>
          </Modal.Header>
          <Modal.Body className="ModaBodyDelCuenta">
            <button
              type="button"
              className="btn btn-secondary text-white mx-2"
              onClick={handleCloseDelCuen}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary text-white  mx-2"
              id="eliminar"
              onClick={eliminarusuario}
            >
              Borrar Cuenta
            </button>
          </Modal.Body>
          <Toaster></Toaster>
        </Modal>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Editar usuario</Modal.Title>
          </Modal.Header>
          <form
            id="update_usuario"
            method="PUT"
            action=""
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
                  id="nombre"
                  name="Nombre"
                  placeholder="Introduce el nombre del usuario"
                  defaultValue={prop_Usuario.prop_usuario.Nombre}
                  required
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
                  <label className="mb-2">Apelidos:</label>
                </strong>
                <input
                  type="text"
                  className="form-control"
                  id="apellido"
                  name="Apellidos"
                  placeholder="Introduce tus apellidos"
                  defaultValue={prop_Usuario.prop_usuario.Apellidos}
                  required
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
                  id="correo"
                  name="Correo"
                  placeholder="Introduce la correo"
                  defaultValue={prop_Usuario.prop_usuario.Correo}
                  required
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
                  id="DNI"
                  name="DNI"
                  placeholder="Introduce el DNI"
                  defaultValue={prop_Usuario.prop_usuario.DNI}
                  required
                  {...register("DNI", {
                    required: {
                      value: true,
                      message: "Necesitas este campo",
                    },
                    pattern: {
                      value: /^\d{8}[a-zA-Z]$/,
                      message:
                        "El formato no es correcto, Necesitas 8 numeros y una Letra",
                    },
                  })}
                />
                {errors.DNI && (
                  <span className={errors.DNI && "mensajeError"}>
                    {errors.DNI.message}
                  </span>
                )}
              </div>
              <div className="form-group mb-2">
                <strong>
                  <label className="mb-2">ID Perfil:</label>
                </strong>
                <select
                  type="number"
                  className="form-control"
                  id="ID_Perfil"
                  name="id_perfiles"
                  defaultValue={selectedOption}
                  required
                  onChange={handleSelectChange}
                >
                  <option value={1}>Administrador</option>
                  <option value={2}>Usuario</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary text-white"
                id="editContr"
                onClick={handleShowPass}
              >
                Editar Password
              </button>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary text-white"
                onClick={handleClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary text-white"
                id="añadir_usuario"
              >
                Editar usuario
              </button>
            </div>
          </form>
          <Toaster></Toaster>
        </Modal>
        <Modal
          show={showPass}
          onHide={handleClosePass}
          animation={false}
          className="ModalEditUsuarioPassword"
        >
          <Modal.Header closeButton>
            <Modal.Title>Editar Contraseña</Modal.Title>
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
  }

  return comprobarAdmin();
};

export default VistaAdminOptionsusuarios;
