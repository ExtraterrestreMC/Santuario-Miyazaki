import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/css/general.css";
// import "./assets/css/bonos.css";
import "./assets/css/style.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { NavHeader } from "./assets/components/NavHeader";
import BonosList from "./assets/components/Bonos/Bonos";
import { Footer } from "./assets/components/Footer";
function App() {
  return (
    <div>
      <BonosList></BonosList>
      <Footer></Footer>
    </div>
  );
}

export default App;
