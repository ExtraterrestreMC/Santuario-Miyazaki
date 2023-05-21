import "bootstrap/dist/css/bootstrap.min.css";

import "leaflet/dist/leaflet.css";

import "./assets/css/style.min.css";
import "bootstrap/dist/js/bootstrap.js";

import { Footer } from "./assets/components/Footer";
import { Contenedor } from "./assets/components/QuienesSomos/Contenedor";
function App() {
  return (
    <div>
      <Contenedor></Contenedor>
      <Footer></Footer>
    </div>
  );
}

export default App;
