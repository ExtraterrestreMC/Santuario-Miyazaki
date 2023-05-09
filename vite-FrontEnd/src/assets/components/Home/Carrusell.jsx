import React from "react";
import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";

export const Carousell = () => {
  return (
    <MDBCarousel showControls fade className="pt-5">
      <MDBCarouselItem
        className="imgCarusel w-100"
        itemId={1}
        src="pexels-ron-lach-7849510.jpg"
        alt="..."
      >
        <div className="textoCarrusel">
          <h5>¡ Te esperamos !</h5>
          <p>Nuestros servicios son los mejores y el ambiente es agradable.</p>
          <hr />
        </div>
      </MDBCarouselItem>

      <MDBCarouselItem
        className="imgCarusel w-100"
        itemId={2}
        src="pexels-yan-krukau-9072379.jpg"
        alt="..."
      >
        <div className="textoCarrusel">
          <h5>Ordenador de última generación</h5>
          <p>Con ellos podrás jugar con alta calidad y velocidad</p>
          <hr />
        </div>
      </MDBCarouselItem>

      <MDBCarouselItem
        video
        className="videoCarusel w-100"
        itemId={3}
        src="pexels-rodnae-productions-7914786.mp4"
        alt="..."
      >
        <div className="textoCarrusel">
          <h5>Crea y aumenta tus amistades</h5>
          <p>
            Además de poder crear tu equipo con amigos o con usuarios de aquí.
          </p>
          <hr />
        </div>
      </MDBCarouselItem>
    </MDBCarousel>
  );
};
