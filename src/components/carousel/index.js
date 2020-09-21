import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";

function MovieCarousel({ list }) {
  

  if (!(list.length > 0)) {
    return <div>Loading</div>;
  }

  return (
    <div className="row carousel-page" style={{ color: "yellow"}}>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`https://image.tmdb.org/t/p/original/${list[0].backdrop_path}`}
            alt="First slide"
          />
          <Carousel.Caption>
            <h1 className="carousel-title">{list[0].title}</h1>
            <h5 className="carousel-overview">{list[0].overview}</h5>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`https://image.tmdb.org/t/p/original/${list[1].backdrop_path}`}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h1 className="carousel-title">{list[1].title}</h1>
            <h5 className="carousel-overview">{list[1].overview}</h5>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`https://image.tmdb.org/t/p/original/${list[2].backdrop_path}`}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h1 className="carousel-title">{list[2].title}</h1>
            <h5 className="carousel-overview">{list[2].overview}</h5>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default MovieCarousel;
