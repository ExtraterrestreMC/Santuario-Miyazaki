import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/general.css";
import "./assets/css/login.css";
import "bootstrap/dist/js/bootstrap.js";
import { NavHeader } from "./assets/components/NavHeader";
import Login from "./assets/components/Usuarios/Login";
import { Footer } from "./assets/components/Footer";
function App() {
  return (
    <div>
      <NavHeader></NavHeader>
      <Login></Login>
      <Footer></Footer>
    </div>
  );
}

export default App;