import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faInstagram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
export const Footer = () => {
  return (
    <>
      <footer className="bg-dark text-center text-white border-0">
        {/* <!-- Grid container --> */}
        <div className="container p-2 pb-0 ">
          {/* <!-- Section: Redes Sociales --> */}
          <section className="mb-2 ">
            {/* <!-- Twitter --> */}
            <a
              className="btn "
              href="https://twitter.com/SatunarioMiyazaki"
              role="button "
            >
              <FontAwesomeIcon
                icon={faTwitter}
                style={{ color: "#ffffff" }}
                className="iconos"
              />
            </a>
            {/* <!-- Instagram --> */}
            <a
              className="btn "
              href="https://www.instagram.com/santuarioMiyazaki/ "
              role="button "
            >
              <FontAwesomeIcon
                icon={faInstagram}
                style={{ color: "#ffffff" }}
                className="iconos"
              />
            </a>

            {/* <!-- Facebook --> */}
            <a
              className="btn "
              href="https://www.facebook.com/santuarioMiyazaki "
              role="button "
            >
              <FontAwesomeIcon
                icon={faFacebook}
                style={{ color: "#ffffff" }}
                className="iconos"
              />
            </a>
          </section>
        </div>
        <div className="text-center p-3 ">
          © 2023 Copyright:{" "}
          <a className="text-white " href="https://SatunarioMiyazaki.com/ ">
            Santuario Miyazaki
          </a>
        </div>
      </footer>
    </>
  );
};
