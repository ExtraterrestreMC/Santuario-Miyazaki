import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.min.css";

import "bootstrap/dist/js/bootstrap.js";

import Login from "./assets/components/Usuarios/Login";
import { Footer } from "./assets/components/Footer";
function App() {
  return (
    <div>
      <Login></Login>
      <Footer></Footer>
    </div>
  );
}

export default App;
