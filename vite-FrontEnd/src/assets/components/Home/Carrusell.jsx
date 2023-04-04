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
        <h5>First slide label</h5>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </MDBCarouselItem>

      <MDBCarouselItem
        className="imgCarusel w-100"
        itemId={2}
        src="pexels-yan-krukau-9072379.jpg"
        alt="..."
      >
        <h5>Second slide label</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </MDBCarouselItem>

      <MDBCarouselItem
        video
        className="videoCarusel w-100"
        itemId={3}
        src="pexels-rodnae-productions-7914786.mp4"
        alt="..."
      >
        <h5>Third slide label</h5>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </MDBCarouselItem>
    </MDBCarousel>
  );
};
