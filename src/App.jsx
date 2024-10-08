import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);



  const fetchMoviesHandler = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      let response = await fetch("https://swapi.dev/api/films/");

      if (!response.ok) {
        throw new Error("Something went wrong.... Retrying");
      }

      response = await response.json();

      const movieData = response.results.map((movies) => {
        return {
          id: movies.episode_id,
          title: movies.title,
          releaseDate: movies.release_date,
          openingText: movies.opening_crawl,
        };
      });
      setMovies(movieData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(()=>{
    fetchMoviesHandler()
  }, [fetchMoviesHandler]);

  let content = <h4>No data found</h4>;

  if (isLoading) {
    content = <h4>Loading...</h4>;
  }

  if (error) {
    content = (
      <div>
        <h4>{error}</h4>
      </div>
    );
  }

  if (movies.length) {
    content = <MoviesList movies={movies} />;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
