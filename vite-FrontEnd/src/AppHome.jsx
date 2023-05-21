import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/css/style.min.css";
import "bootstrap/dist/js/bootstrap.js";
import { Carousell } from "./assets/components/Home/Carrusell";
import { Footer } from "./assets/components/Footer";
import CookiesPopUp from "./assets/components/CookiesPopUp";
function App() {
  return (
    <>
      <CookiesPopUp></CookiesPopUp>
      <Carousell></Carousell>
      <Footer></Footer>
    </>
  );
}

export default App;
