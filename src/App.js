import React, { useState, useEffect } from 'react';
import apiClient from './service/api';

const App = () => {
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const {data, status} = await apiClient.get(`/top_rated?api_key=${process.env.REACT_APP_APIKEY}`);
      if(status === 200) {
        setMovies(data.results);
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
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.original_title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
