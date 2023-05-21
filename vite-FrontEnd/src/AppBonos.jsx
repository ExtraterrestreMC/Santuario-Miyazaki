import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/css/style.min.css";
import "bootstrap/dist/js/bootstrap.js";

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
