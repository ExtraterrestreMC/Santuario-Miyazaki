import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/css/general.css";
// import "./assets/css/home.css";
import "./assets/css/style.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { NavHeader } from "./assets/components/NavHeader";
import { Carousell } from "./assets/components/Home/Carrusell";
import { Footer } from "./assets/components/Footer";
function App() {
  return (
    <div>
      <NavHeader></NavHeader>
      <Carousell></Carousell>
      <Footer></Footer>
    </div>
  );
}

export default App;
