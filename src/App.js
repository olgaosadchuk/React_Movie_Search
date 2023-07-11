import { useState, useEffect } from "react";
//import logo from "./logo.svg";
//import "./App.css";

// Import our components
import MovieDisplay from "./components/MovieDisplay";
import Form from "./components/Form";

export default function App() {
  // Variable with your API Key
  const apiKey = "98e3fb1f";

  // State to hold movie data
  const [movie, setMovie] = useState(null);

  // Function to get movies
  const getMovie = async (searchTerm) => {
    // // Make fetch request and store the response

    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${searchTerm}`
      );
      const data = await response.json();
      setMovie(data);
    } catch(e) {
      console.error(e)
    }
  };

  // // This will run on the first render but not on subsquent renders
  // useEffect(() => {
  //   getMovie("Clueless");
  // }, []);

  useEffect(() => {
    const getRandomMovie = async (searchTerm) => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&type=movie`);
        const data = await response.json();
        if (data.Search && data.Search.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.Search.length);
          const randomMovie = data.Search[randomIndex];
          const movieResponse = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${randomMovie.imdbID}`);
          const movieData = await movieResponse.json();
          setMovie(movieData);
        }
      } catch (e) {
        console.error(e);
      }
    };
  
    const searchTerm = "comedy"; // Replace with your desired search term
    getRandomMovie(searchTerm);
  }, []);


  // We pass the getMovie function as a prop called moviesearch
  // We pass movie as props to movie display
  return (
    <div className="App">
      <Form moviesearch={getMovie} />
      <MovieDisplay movie={movie} />
    </div>
  );
}