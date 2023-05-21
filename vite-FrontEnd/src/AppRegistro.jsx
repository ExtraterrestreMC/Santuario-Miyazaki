import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/css/style.min.css";
import "bootstrap/dist/js/bootstrap.js";

import Registro from "./assets/components/Usuarios/Registro";
import { Footer } from "./assets/components/Footer";
function App() {
  return (
    <div>
      <Registro></Registro>
      <Footer></Footer>
    </div>
  );
}

export default App;
