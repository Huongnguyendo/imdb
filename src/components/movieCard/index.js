import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import Modal from "react-modal";

const MovieCard = ({ movie, genres, openModal}) => {
  if(!genres || genres.length < 1) {
    return (
      <div>Loading...</div>
    )
  }
  return (

      <Card className="cardd" style={{ width: "18rem", height: "400px" }}>
        <Card.Img className="card-image" 
          variant="top"
          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
        />
        <Card.Body>

          <Card.ImgOverlay>
            <div className="card-content">
              <Card.Title className="mb-3">
                <h1
                  id="item-title"
                >
                  {movie.title}
                </h1>
              </Card.Title>
              <Card.Text className="mb-2">
                {movie.genre_ids.map((id) => {
                  return (
                    <Badge variant="warning" style={{marginLeft: "5px"}}>
                      {genres.find((item) => item.id == id).name}
                    </Badge>
                  );
                })}
              </Card.Text>
              <Card.Text>Popularity: {movie.popularity}</Card.Text>
              <Card.Text>Ratings: {movie.vote_average}</Card.Text>
              <Card.Text>Release Date: {movie.release_date}</Card.Text>

              <Card.Text>
                <div id="overview-text">{movie.overview}</div>
              </Card.Text>
              <Button variant="success" className="mb-2 mr-2"><a style={{ textDecoration: "none", color: "white" }} href={`https://www.themoviedb.org/movie/${movie.id}?language=en-US`}>See More</a></Button>
              <Button onClick={() => openModal(movie.id)} variant="primary" className="mb-2">Trailer</Button>

            </div>
          </Card.ImgOverlay>
        </Card.Body>
      </Card>
 
  );
};

export default MovieCard;
