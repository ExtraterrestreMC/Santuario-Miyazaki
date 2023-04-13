import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/css/general.css";
// import "./assets/css/usuario.css";
import "./assets/css/style.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { NavHeader } from "./assets/components/NavHeader";
import AdminUser from "./assets/components/Usuarios/AdminUser";
import { Footer } from "./assets/components/Footer";
function App() {
  return (
    <div>
      <NavHeader></NavHeader>
      <AdminUser></AdminUser>
      <Footer></Footer>
    </div>
  );
}

export default App;
