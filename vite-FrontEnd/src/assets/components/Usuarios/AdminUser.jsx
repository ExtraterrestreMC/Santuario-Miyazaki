import React from "react";
import axios from "axios";
import VistaAdminOptionsusuarios from "./VistaAdminOptionsUsuario";
const usuario = JSON.parse(sessionStorage.getItem("usuario"));
const URL_Usuarios_Basica = `${import.meta.env.VITE_APP_BackEnd}${
  import.meta.env.VITE_APP_Usuarios
}`;

export default class AdminUser extends React.Component {
  state = {
    usuarios: [],
  };

  componentDidMount() {
    axios
      .get(URL_Usuarios_Basica, {
        "Content-Type": "application/json;charset=UTF-8",
        withCredentials: true,
        mode: "cors",
      })
      .then((response) => {
        let usuarios = response.data;

        this.setState({ usuarios });
      })
      .catch((err) => {
        toast.success(err.data.desc);
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
                  <tr>
                    <th className="THeadID">ID Usuario</th>
                    <th className="THeadName">Nombre</th>
                    <th className="THeadApe">Apellidos</th>

                    <th className="THeadDNI">DNI</th>
                    <th className="THeadIDPer">ID Perfil</th>
                    <th className="THeadOption">Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.usuarios.map((usuario) => (
                    <tr key={usuario.id_usuario}>
                      <td className="TDID">{usuario.id_usuario}</td>
                      <td className="TDName">{usuario.Nombre}</td>
                      <td className="TDApe">{usuario.Apellidos}</td>

                      <td className="TDDNI">{usuario.DNI}</td>
                      <td className="TDIDPerf">
                        {usuario.id_perfiles == 1 ? "Administrador" : "Usuario"}
                      </td>
                      <td className="TDOption">
                        <VistaAdminOptionsusuarios
                          prop_usuario={usuario}
                        ></VistaAdminOptionsusuarios>
                      </td>
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
