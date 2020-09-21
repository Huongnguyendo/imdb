import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-input-range/lib/css/index.css";
import InputRange from "react-input-range";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import MovieList from "./components/movieList";
import { Navbar, Nav, NavDropdown, Form, FormControl } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import Navigation from "./components/navigation";
import MovieCarousel from "./components/carousel";
import Pagination from "react-js-pagination";
import ReactModal from 'react-modal';

const apikey = process.env.REACT_APP_APIKEY;

// for spinner
const override = css`
  display: block;
  margin: 25% auto;
  border-color: red;
`;

function App() {
  // for rendering, movieList mvp, only ca about setMovieList
  let [movieList, setMovieList] = useState([]);
  // for pagination
  let [page, setPage] = useState(1);
  // movieList only has 20 items --> need total result for pagination
  let [totalResult, setTotalResult] = useState(0);
  // to get array of all genres 
  let [genres, setGenres] = useState(null);
  // rate is not a single value but an object with min and max values
  let [rate, setRate] = useState({ min: 0, max: 10 });
  // to search by specific genre
  let [searchGenre, setSearchGenre] = useState(null);
  // call everytime api is called, for sort funcs
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
    setGenres(data.genres);
  };

  // get genres on cards first time page loaded
  useEffect(() => {
    getGenres();
  }, []);
  // then render
  useEffect(() => {
    getMovieLatest();
  }, []);
  
  
  let handleActivePage = async (page) => {
    // set active page using setPage
    setPage(page);
    // pass pageNum to getMovieLatest func
    getMovieLatest(page);
  };

  const searchByKeyword = async (keyword) => {
    // if theres no keyword when button clicked
    if (keyword === "" || keyword === null) {
      return;
    }

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyword}`;
    let response = await fetch(url);
    let data = await response.json();
    setTotalResult(data.total_results);
    setOriginalList(data.results);
    setMovieList(data.results);
  };

  let filterByRate = (rate) => {
    console.log("rating value:", rate);
    setRate(rate);
    let filteredMovies = originalList.filter((movie) => {
      // rate is an object with min and max
      return movie.vote_average >= rate.min && movie.vote_average <= rate.max;
    });
    setMovieList(filteredMovies); // no spread bc filter makes a different array
  };

  const searchByTopRated = async () => {
    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&language=en-US&page=1`;
    let response = await fetch(url);
    let data = await response.json();
    setTotalResult(data.total_results);
    setOriginalList(data.results);
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

  
  // param genre is passed from navigation component
  const getMoviesByGenre = async (genre) => {
    // set genre to the chosen genre
    setSearchGenre(genre);
    // fetch api accordingly
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${genre}`;
    let response = await fetch(url);
    let data = await response.json();
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
        filterByRate={filterByRate}
        rate={rate}
      />

      <MovieCarousel list={movieList} />

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
