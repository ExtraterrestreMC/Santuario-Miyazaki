import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/general.css";
import "./assets/css/platos.css";
import "bootstrap/dist/js/bootstrap.js";
import { NavHeader } from "./assets/components/NavHeader";
import PlatosList from "./assets/components/Carta/Carta";
import { Footer } from "./assets/components/Footer";

function App() {
  return (
    <div>
      <NavHeader></NavHeader>
      <PlatosList></PlatosList>
      <Footer></Footer>
    </div>
  );
}

export default App;