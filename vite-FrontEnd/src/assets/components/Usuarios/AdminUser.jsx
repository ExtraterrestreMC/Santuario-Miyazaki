import React from "react";
import axios from "axios";
import VistaAdminOptionsusuarios from "./VistaAdminOptionsUsuario";
const usuario = JSON.parse(sessionStorage.getItem("usuario"));
const UrlUsarios = "https://localhost:3000/api/v1/usuarios";

export default class AdminUser extends React.Component {
  state = {
    usuarios: [],
  };

  componentDidMount() {
    axios
      .get(UrlUsarios, {
        "Content-Type": "application/json;charset=UTF-8",
        withCredentials: true,
        mode: "cors",
      })
      .then((response) => {
        //console.log(response);
        let usuarios = response.data;
        console.log(usuarios);
        this.setState({ usuarios });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (usuario) {
      if (usuario.id_perfiles == 1) {
        return (
          <div id="adminContendor">
            <div className="card">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr className="mw-25">
                    <th>ID Usuario</th>
                    <th>Nombre</th>
                    <th>Apellidos</th>
                    <th>Email</th>
                    <th>DNI</th>
                    <th>ID Perfil</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.usuarios.map((usuario) => (
                    <tr key={usuario.id_usuario} className="">
                      <th>{usuario.id_usuario}</th>
                      <th>{usuario.Nombre}</th>
                      <th>{usuario.Apellidos}</th>
                      <th>{usuario.Correo}</th>
                      <th>{usuario.DNI}</th>
                      <th>{usuario.id_perfiles}</th>
                      <th>
                        <VistaAdminOptionsusuarios
                          prop_usuario={usuario}
                        ></VistaAdminOptionsusuarios>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      } else {
        return (
          <div
            id="adminContendorNoUT"
            className="mt-5 pt-2 translate bg-opacity-75"
          >
            <div className="card m-5 translate bg-opacity-75">
              <h1 className="text-danger">No puedes acceder aqui</h1>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div
          id="adminContendorNoUT"
          className="mt-5 pt-2 translate bg-opacity-75"
        >
          <div className="card m-5 translate bg-opacity-75">
            <h1 className="text-danger bg-opacity-75">
              No puedes acceder aqui
            </h1>
          </div>
        </div>
      );
    }
  }
}
