import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/css/style.min.css";
import "bootstrap/dist/js/bootstrap.js";

import AdminUser from "./assets/components/Usuarios/AdminUser";
import { Footer } from "./assets/components/Footer";
function App() {
  return (
    <div>
      <AdminUser></AdminUser>
      <Footer></Footer>
    </div>
  );
}

export default App;
