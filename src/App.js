import React, {useEffect, useState} from 'react';
// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import 'react-input-range/lib/css/index.css';
import InputRange from 'react-input-range';
import MovieList from './components';
import {Navbar, Nav, NavDropdown, Form, FormControl} from "react-bootstrap";
import Navigation from './components/navigation';
import Pagination from "react-js-pagination";
import FilterBoard from './components/filterBoard';


const apikey = process.env.REACT_APP_APIKEY;

function App() {
  let [movieList, setMovieList] = useState([]);
  let [page, setPage] = useState(1);
  let [genres, setGenres] = useState(null);
  let [totalResult, setTotalResult] = useState(0);
  let [year, setYear] = useState({ min: 1980, max: 2020 });
  let [rate, setRate] = useState({min:0, max: 10});

  // get now playing movies
  const getMovieLatest = async () => {
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=1`;
    let response = await fetch(url);
    let data = await response.json()
    setTotalResult(data.total_results);
    console.log("total result: ", data.total_results)
    // we only need to know the results array of data 
    setMovieList(data.results);
  }

  

  const getGenres = async() => {
    let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`;
    let result = await fetch(url);
    let data = await result.json();
    
    setGenres(data.genres);
    // getMovieLatest();
  }

  useEffect(() => {
    getGenres();
  }, []);
  

  let handlePageChange = async (pageNumber) => {
    setPage(pageNumber);
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&language=en-US&page=${pageNumber}`
    let response = await fetch(url);
    let data = await response.json()
    console.log("data", data);
    setMovieList(data.results);
  }

  const searchByKeyword = async (keyword) => {
    console.log("searchbykeyword");
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyword}`;
    let response = await fetch(url);
    let data = await response.json()
    console.log("data", data);
    setMovieList(data.results);
  }

  const filterByYear = (value) => {
    setYear(value);
    let filteredList = movieList.filter((movie) => {
      let year = parseInt(movie.release_date.split("-")[0]);
      return year > value.min && value < year.max;
    });
    
    setMovieList(filteredList);
  };

  let filterByRating = (rate) => {
    console.log('rating value:', rate);
    console.log('movieList:', movieList)
    setRate(rate);
    // console.log('value.min & max', ratingValue.value.min, ratingValue.value.max)
    let filteredMovies = movieList.filter(movie => {
       return movie.vote_average >= rate.min && movie.vote_average <= rate.max;
    });
    console.log('filtered Movies:', filteredMovies)
    setMovieList(filteredMovies);
  }

  const searchByTopRated = async () => {
    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&language=en-US&page=1`;
    let response = await fetch(url);
    let data = await response.json()
    console.log("data", data);
    setMovieList(data.results);
  }

  const sortByRate = (direction) => {
    let sortedList;
    if (direction === "asc") {
      sortedList = movieList.sort((a, b) => a.vote_average - b.vote_average);
    } else {
      sortedList = movieList.sort((a, b) => b.vote_average - a.vote_average);
    }
    setMovieList([...sortedList]);
  };

  const sortByPopular = (direction) => {
    let sortedList;
    if (direction === "asc") {
      sortedList = movieList.sort((a, b) => a.popularity - b.popularity);
    } else {
      sortedList = movieList.sort((a, b) => b.popularity - a.popularity);
    }
    setMovieList([...sortedList]);
  };

  

  useEffect(() => {
    getMovieLatest();
  }, []);

  

  return (
    <div className="App">
      <Navigation searchByTopRated={searchByTopRated} searchByKeyword={searchByKeyword}/>
      
      <FilterBoard
      sortByRate={sortByRate}
            sortByPopular={sortByPopular}
            filterByYear={filterByYear}
            filterByRating={filterByRating}
            year={year}
            rate={rate}
          />
      {/* <MovieBoard movieList={movieList} genres={genres} /> */}
      <MovieList list={movieList} genres={genres} />
      <Pagination
        prevPageText='prev'
        nextPageText='next'
        firstPageText='first'
        lastPageText='last'
        activePage={page}
        itemsCountPerPage={20}
        totalItemsCount={totalResult}
        pageRangeDisplayed={5}
        onChange={(page) => handlePageChange(page)}
        itemClass="page-item"
        linkClass="page-link"
      />
    </div>
  );
}

export default App;
