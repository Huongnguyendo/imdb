import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import Modal from "react-modal";
import ReactModal from "react-modal";

const MovieCard = ({ movie, genres, getTrailer }) => {
  if (!genres || genres.length < 1) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Card className="card" style={{ width: "18rem", height: "400px" }}>
        <Card.Img
          className="card-image"
          variant="top"
          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
        />
        <Card.Body>
          <Card.ImgOverlay>
            <div className="card-content">
              <Card.Title className="mb-3">
                <h1 className="item-title">{movie.title}</h1>
                <ReactModal isOpen={false}>
                  <button> Hide Modal </button>
                </ReactModal>
              </Card.Title>
              <Card.Text className="mb-2">
                {movie.genre_ids.map((id) => {
                  return (
                    <Badge variant="warning" style={{ marginLeft: "5px" }}>
                      {genres.find((item) => item.id == id).name}
                    </Badge>
                  );
                })}
              </Card.Text>
              <Card.Text>Popularity: {movie.popularity}</Card.Text>
              <Card.Text>Ratings: {movie.vote_average}</Card.Text>
              <Card.Text>Release Date: {movie.release_date}</Card.Text>

              <Card.Text>
                <div className="overview-text">{movie.overview}</div>
              </Card.Text>
              <Button variant="success" className="mb-2 mr-2">
                <a
                  style={{ textDecoration: "none", color: "white" }}
                  href={`https://www.themoviedb.org/movie/${movie.id}?language=en-US`}
                >
                  See More
                </a>
              </Button>
              <Button variant="primary" className="mb-2" onClick={() => getTrailer(movie.id)}>
                Trailer
              </Button>
            </div>
          </Card.ImgOverlay>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MovieCard;
