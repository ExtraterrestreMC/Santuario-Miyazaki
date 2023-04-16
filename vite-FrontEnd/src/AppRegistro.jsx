import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/css/general.css";
// import "./assets/css/registro.css";
import "./assets/css/style.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { NavHeader } from "./assets/components/NavHeader";
import Registro from "./assets/components/Usuarios/Registro";
import { Footer } from "./assets/components/Footer";
function App() {
  return (
    <div>
      <NavHeader></NavHeader>
      <Registro></Registro>
      <Footer></Footer>
    </div>
  );
}

export default App;
