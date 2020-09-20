import React from "react";
import { Card, Button, Badge } from "react-bootstrap";

const MovieCard = ({ movie, genres }) => {
  console.log(movie);
  return (
    <div className="mr-5">
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
        />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.overview}</Card.Text>
          <Card.Text>Popularity: {movie.popularity}</Card.Text>
          <Card.Text>Rating: {movie.vote_average}</Card.Text>
          <Card.Text>Release date: {movie.release_date}</Card.Text>
          <div>
          {movie.genre_ids.map((genre) => {
            return (
              <Badge variant="danger" style={{ marginRight: "10px" }}>
                {genres.find((item) => item.id == genre).name}
              </Badge>
            );
          })}
          </div>
          
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MovieCard;
