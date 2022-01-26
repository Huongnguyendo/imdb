import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";

function MovieCarousel({ list }) {
  if (!(list.length > 0)) {
    return <div>Loading</div>;
  }

  return (
    <div className="row carousel-page" style={{ color: "yellow" }}>
      <Carousel>
        <Carousel.Item>
          <a
            href={`https://www.themoviedb.org/movie/${list[0].id}?language=en-US`}
          >
            <img
              className="carousel-img "
              src={`https://image.tmdb.org/t/p/original/${list[0].backdrop_path}`}
              alt="First slide"
            />
          </a>
          <Carousel.Caption>
            <h1 className="carousel-title">{list[0].title}</h1>
            <h5 className="carousel-overview">{list[0].overview}</h5>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <a
            href={`https://www.themoviedb.org/movie/${list[1].id}?language=en-US`}
          >
            <img
              className="carousel-img "
              src={`https://image.tmdb.org/t/p/original/${list[1].backdrop_path}`}
              alt="Second slide"
            />
          </a>
          <Carousel.Caption>
            <h1 className="carousel-title">{list[1].title}</h1>
            <h5 className="carousel-overview">{list[1].overview}</h5>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <a
            href={`https://www.themoviedb.org/movie/${list[2].id}?language=en-US`}
          >
            <img
              className="carousel-img"
              src={`https://image.tmdb.org/t/p/original/${list[2].backdrop_path}`}
              alt="Third slide"
            />
          </a>
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
