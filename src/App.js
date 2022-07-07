import React, { useState, useEffect } from 'react';
import apiClient from './service/api';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const {data, status} = await apiClient.get(`/top_rated?api_key=${process.env.REACT_APP_APIKEY}`);
      if(status === 200) {

        setLoading(true);
        setTimeout(()=> {
          setLoading(false);
          setMovies(data.results);
        }, 1000)
        console.log('MOVIE_DATA', data.results)
      }

    } catch(error) {
      //
      console.log(error.message);
    }
  }

  useEffect(()=> {
    getMovies();
  }, [])

  return (
    <div>
      <h1>App</h1>
      {loading && <div>Loading....</div>}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <p><img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} width="240" /></p>
            {movie.original_title}
            </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
