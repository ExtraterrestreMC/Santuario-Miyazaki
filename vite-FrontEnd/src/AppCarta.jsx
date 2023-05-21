import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/css/style.min.css";
import "bootstrap/dist/js/bootstrap.js";

import PlatosList from "./assets/components/Carta/Carta";
import { Footer } from "./assets/components/Footer";

function App() {
  return (
    <>
      <PlatosList></PlatosList>
      <Footer></Footer>
    </>
  );
}

export default App;
