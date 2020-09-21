import React, { useEffect, useState } from "react";
// import logo from './logo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-input-range/lib/css/index.css";
import InputRange from "react-input-range";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import MovieList from "./components";
import { Navbar, Nav, NavDropdown, Form, FormControl } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Navigation from "./components/navigation";
import MovieCarousel from "./components/carousel";
import Pagination from "react-js-pagination";
import Modal from "react-modal";

const apikey = process.env.REACT_APP_APIKEY;

// for spinner
const override = css`
  display: block;
  margin: 25% auto;
  border-color: red;
`;

function App() {
  let [movieList, setMovieList] = useState([]);
  // for pagination
  let [page, setPage] = useState(1);
  // movieList only has 20 items --> need total result for pagination
  let [totalResult, setTotalResult] = useState(0);
  let [genres, setGenres] = useState(null);
  let [rate, setRate] = useState({ min: 0, max: 10 });
  let [searchGenre, setSearchGenre] = useState(null);
  let [originalList, setOriginalList] = useState(null);

  // get now playing movies
  const getMovieLatest = async (page) => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=${page}`;
    let response = await fetch(url);
    let data = await response.json();
    // get total result for pagination, call everytime api is called 
    setTotalResult(data.total_results);
    // get original list for sort funcs
    setOriginalList(data.results);
    console.log("total result: ", data.total_results.length);
    // only need to know the results array of data
    setMovieList(data.results);
  };

  // get list of genres
  const getGenres = async () => {
    let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`;
    let result = await fetch(url);
    let data = await result.json();
    //for pagination 
    setTotalResult(data.total_results);
    setGenres(data.genres);
    // getMovieLatest();
  };

  // get genres on cards
  useEffect(() => {
    getGenres();
  }, []);

  let handleActivePage = async (page) => {
    setPage(page);
    getMovieLatest(page);
  };

  const searchByKeyword = async (keyword) => {
    // if theres no keyword
    if (keyword == "" || keyword == null) {
      return;
    }

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyword}`;
    let response = await fetch(url);
    let data = await response.json();
    setTotalResult(data.total_results);
    setMovieList(data.results);
    setOriginalList(data.results);
    
  };

  let filterByRating = (rate) => {
    console.log("rating value:", rate);
    console.log("movieList:", movieList);
    setRate(rate);
    let filteredMovies = originalList.filter((movie) => {
      return movie.vote_average >= rate.min && movie.vote_average <= rate.max;
    });
    console.log("filtered Movies:", filteredMovies);
    setMovieList(filteredMovies);
  };

  const searchByTopRated = async () => {
    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&language=en-US&page=1`;
    let response = await fetch(url);
    let data = await response.json();
    setTotalResult(data.total_results);
    setMovieList(data.results);
  };

  const sortByRate = (direction) => {
    let sortedList;
    if (direction === "desc") {
      sortedList = movieList.sort((a, b) => b.vote_average - a.vote_average);
    } else {
      sortedList = movieList.sort((a, b) => a.vote_average - b.vote_average);
    }
    setMovieList([...sortedList]);
  };

  const sortByPopular = (direction) => {
    let sortedList;
    if (direction === "desc") {
      sortedList = movieList.sort((a, b) => b.popularity - a.popularity);
    } else {
      sortedList = movieList.sort((a, b) => a.popularity - b.popularity);
    }
    setMovieList([...sortedList]);
  };

  useEffect(() => {
    getMovieLatest();
  }, []);

  const getMoviesByGenre = async (genre) => {
    setSearchGenre(genre);
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${genre}`;
    let response = await fetch(url);
    let data = await response.json();
    // setMovieList(result);
    console.log("total results genre", data.total_results);
    setTotalResult(data.total_results);
    setOriginalList(data.results);
    setMovieList(data.results);
  };

  if (!movieList) {
    return (
      <div className="sweet-loading">
        <ClipLoader
          css={override}
          size={150}
          color={"#purple"}
          loading={this.state.loading}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <Navigation
        getMovieLatest={getMovieLatest}
        searchByTopRated={searchByTopRated}
        searchByKeyword={searchByKeyword}
        getMoviesByGenre={getMoviesByGenre}
        sortByRate={sortByRate}
        sortByPopular={sortByPopular}
        filterByRating={filterByRating}
        rate={rate}
      />

      <MovieCarousel list={movieList} />

      <Modal isOpen={false} />

      <MovieList list={movieList} genres={genres} />
      <Pagination
        prevPageText="prev"
        nextPageText="next"
        firstPageText="first"
        lastPageText="last"
        activePage={page}
        itemsCountPerPage={20}
        totalItemsCount={totalResult}
        pageRangeDisplayed={5}
        onChange={(page) => handleActivePage(page)}
        // for style
        itemClass="page-item"
        linkClass="page-link"
      />
    </div>
  );
}

export default App;
