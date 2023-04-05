import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

const usuarioJSON = JSON.parse(sessionStorage.getItem("usuario"));
let edit_borrar = "https://localhost:3000/api/v1/usuarios/";

const VistaAdminOptionsusuarios = (prop_Usuario) => {
  //console.log(prop_Usuario);
  const formRef = React.useRef();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  function usuarioEditSubmit() {
    const formData = new FormData(formRef.current);
    console.log(formData);
    const usuario = Object.fromEntries(formData);
    if (usuario.Contraseña == "*******") {
      usuario.Contraseña = usuarioJSON.Contraseña;
    }

    //console.log(usuario);
    let urlModficada = edit_borrar + `${prop_Usuario.prop_usuario.id_usuario}`;
    actulizarusuario(urlModficada, usuario);
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
        console.log(responseData.data.info);
        //location.reload();
      })
      .catch((err) =>
        //alert(err.response.data.desc)
        console.log(err)
      );
  }
  const handleShow = () => setShow(true);

  function eliminarusuario() {
    if (
      confirm(
        "¿Estás seguro de que quieras borrar tu cuenta? \nTen encuenta que se perderan todos tus datos"
      ) == true
    ) {
      let urlModficada =
        edit_borrar + `${prop_Usuario.prop_usuario.id_usuario}`;
      axios
        .delete(urlModficada, {
          "Content-Type": "application/json;charset=UTF-8",
          withCredentials: true,
          mode: "cors",
        })
        .then((datosRespuesta) => {
          alert(datosRespuesta.data.info);
          location.reload();
        })
        .catch((err) => console.log(err));
    }
  }

  function comprobarAdmin() {
    return (
      <div className="btn-group">
        <button className=" btn btn-warning btn-rounded " onClick={handleShow}>
          Editar
        </button>

        <button
          className="btn btn-danger btn-rounded text-black mx-2"
          onClick={eliminarusuario}
        >
          Borrar
        </button>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Añadir usuario</Modal.Title>
          </Modal.Header>
          <form
            id="update_usuario"
            method="PUT"
            action=""
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
                  id="nombre"
                  name="Nombre"
                  placeholder="Introduce el nombre del usuario"
                  defaultValue={prop_Usuario.prop_usuario.Nombre}
                  required
                ></input>
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
                ></input>
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
                ></input>
              </div>
              <div className="form-group mb-2">
                <strong>
                  <label className="mb-2">Contraseña:</label>
                </strong>
                <input
                  type="password"
                  className="form-control"
                  id="constraseña"
                  name="Contraseña"
                  placeholder="Introduce la constraseña"
                  defaultValue={"*******"}
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
                  id="DNI"
                  name="DNI"
                  placeholder="Introduce el DNI"
                  defaultValue={prop_Usuario.prop_usuario.DNI}
                  required
                ></input>
              </div>
              <div className="form-group mb-2">
                <strong>
                  <label className="mb-2">ID Perfil:</label>
                </strong>
                <input
                  type="number"
                  className="form-control"
                  id="ID_Perfil"
                  name="id_perfiles"
                  placeholder="Introduce el ID Perfil"
                  defaultValue={prop_Usuario.prop_usuario.id_perfiles}
                  required
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
                id="añadir_usuario"
              >
                Editar usuario
              </button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }

  return comprobarAdmin();
};

export default VistaAdminOptionsusuarios;
