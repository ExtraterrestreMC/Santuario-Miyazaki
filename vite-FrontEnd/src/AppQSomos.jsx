import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/css/general.css";
import "leaflet/dist/leaflet.css";
// import "./assets/css/QSomos.css";
import "./assets/css/style.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { NavHeader } from "./assets/components/NavHeader";
import { Footer } from "./assets/components/Footer";
import { Contenedor } from "./assets/components/QuienesSomos/Contenedor";
function App() {
  return (
    <div>
      <NavHeader></NavHeader>
      <Contenedor></Contenedor>
      <Footer></Footer>
    </div>
  );
}

export default App;
