import React from "react";
import axios from "axios";
const URL = "https://localhost:3000/api/v1/bonos";

export default class BonosList extends React.Component {
  state = {
    bonos: [],
  };

  componentDidMount() {
    axios.get(URL).then((response) => {
      //console.log(response);
      let bonos = response.data;
      //   bonos.map((bono) => {
      //     bono.imagen = bono.imagen + "." + bono.extension;
      //     delete bono.extension;
      //   });
      //   console.log(bonos);
      this.setState({ bonos });
    });
  }

  render() {
    return (
      <div>
        <section id="gallery" className="pt-5">
          <div className="container pt-5">
            <section className="py-2">
              <div id="mainBonos">
                {this.state.bonos.map((bono) => (
                  <div className="card m-4" key={bono._id}>
                    <div className="card-body">
                      <h5 className="card-title font-weight-bold mx">
                        {bono.nombre}
                      </h5>
                      <p className="mb-2">• {bono.precio}€</p>
                      <hr></hr>
                      <p>{bono.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    );
  }
}
