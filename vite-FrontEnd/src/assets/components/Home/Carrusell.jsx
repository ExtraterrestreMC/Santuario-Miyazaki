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
          <h5>Te estamos esperando</h5>
          <p>Nuestros servicios son los mejores y el ambiente agradable.</p>
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
          <h5>Ordenador de ultima generación</h5>
          <p>Con lo cuales podras jugar a alta calidad y alta velocidad.</p>
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
          <h5>Crea y aumento tu amistades</h5>
          <p>
            Ademas de poder crear tu equipo con amigo o con usuarios de aqui.
          </p>
          <hr />
        </div>
      </MDBCarouselItem>
    </MDBCarousel>
  );
};
