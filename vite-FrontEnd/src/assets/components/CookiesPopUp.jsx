import React from "react";
import CookieConsent from "react-cookie-consent";
import "../css/sass/componentes/cookiePopUp.scss";
const CookiesPopUp = () => {
  return (
    <div className="popUp">
      <CookieConsent
        disableStyles
        location="none"
        buttonText="Acceptar"
        cookieName="cookieAceptada"
        cookieValue="true"
        overlay
        overlayClasses="overlayclass"
      >
        Las cookies de nuestra pagina web solo seran para nosotros, y no daremos
        informacion a ninugna pagina/expresa esterna
      </CookieConsent>
    </div>
  );
};
export default CookiesPopUp;
