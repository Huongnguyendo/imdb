import React, { Component } from "react";
import MovieCard from "../movieCard";
import { Row, Col } from "react-bootstrap";

const MovieList = (props) => {
  let { list, genres, openModal } = props;
  // console.log("list from app: ", list);
  return (
    // map func is in MovieList Component, send each Card info to MovieCard component
    <div className="row d-flex movie-row">
      {list.map((item) => {
        return <MovieCard movie={item} genres={genres} openModal={openModal} />;
      })}
    </div>
  );
};

export default MovieList;
