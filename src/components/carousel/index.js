import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";

function MovieCarousel() {
  let [movieListSlider, setMovieListSlider] = useState([]);

  const getTrending = async () => {
    const apikey = process.env.REACT_APP_APIKEY;
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=1`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("trending data results: ", data.results);
    movieListSlider(data.results);
  };

  useEffect(getTrending, []);

  if (!movieListSlider) {
    return <div>Loading</div>;
  }

  return (
    <div className="row">
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`https://image.tmdb.org/t/p/original/${movieListSlider[0].backdrop_path}`}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>{movieListSlider[0].title}</h3>
            <p>{movieListSlider[0].overview}</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`https://image.tmdb.org/t/p/original/${movieListSlider[1].backdrop_path}`}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>{movieListSlider[1].title}</h3>
            <p>{movieListSlider[1].overview}</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`https://image.tmdb.org/t/p/original/${movieListSlider[2].backdrop_path}`}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>{movieListSlider[2].title}</h3>
            <p>{movieListSlider[2].overview}</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    
    </div>
  
  );
}

export default MovieCarousel;
