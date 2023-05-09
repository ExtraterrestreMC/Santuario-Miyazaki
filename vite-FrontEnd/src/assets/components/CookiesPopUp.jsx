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
        <h2 className="text-decoration-underline">Nuestras Cookies</h2>
        <p className=" py-2">
          Las cookies de nuestra página web serán únicamente para nosotros y no
          proporcionaremos información a ninguna página o entidad externa.
        </p>
      </CookieConsent>
    </div>
  );
};
export default CookiesPopUp;
