import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';


function App() {

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // const [retry, setRetry] = useState(false);
  
  async function fetchMoviesHandler(){
    try{
      setError(null);
      setIsLoading(true);
      let response = await fetch('https://swapi.dev/api/film /');

      if(!response.ok){
        throw new Error('Something went wrong.... Retrying');
      }

      response = await response.json();


      const movieData = response.results.map((movies)=> {
        return {
          id: movies.episode_id,
          title: movies.title,
          releaseDate: movies.release_date,
          openingText: movies.opening_crawl
        }
      })
      setMovies(movieData);
      // setRetry(false);

    }catch(error){
      setError(error.message);
      // setRetry(true);
    }
    setIsLoading(false);

  }

  let content = <h4>No data found</h4>

    if(isLoading){
      content = <h4>Loading...</h4>
    }

    if(error){
      content = <div>
        <h4>{error}</h4><button onClick={()=> {
          setError(null)
          clearInterval();
          }}>Cancel</button>
      </div>
      setInterval( ()=> {console.log("fetchMoviesHandler() called"); fetchMoviesHandler()}, 5000)

    }

    if(movies.length){
      content = <MoviesList movies={movies}/>
    }


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
