import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  
  async function fetchMoviesHandler(){
    setIsLoading(true);
    let response = await fetch('https://swapi.dev/api/films/');
    response = await response.json()
    const movieData = response.results.map((movies)=> {
      return {
        id: movies.episode_id,
        title: movies.title,
        releaseDate: movies.release_date,
        openingText: movies.opening_crawl
      }
    })
    setMovies(movieData)
    setIsLoading(false);


  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && <MoviesList movies={movies} />}
        {isLoading && <h4>Loading...</h4>}
      </section>
    </React.Fragment>
  );
}

export default App;
