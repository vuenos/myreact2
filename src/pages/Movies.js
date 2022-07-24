import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../service/api';

const Movies = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [pages, setPages] = useState("");

  const getMovies = async () => {
    try {
      const {data, status} = await apiClient.get(`/popular?api_key=${process.env.REACT_APP_APIKEY}&page=1`);
      if(status === 200) {

        setLoading(true);
        setTimeout(()=> {
          setLoading(false);
          setMovies(data.results);
          setPages(data);
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
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      {loading && <div>Loading....</div>}

      <div>
        {pages.total_pages}
        {pages.total_pages > 1 && (
          <div>
            {[...Array(pages.total_pages).keys()].map((x) => (
              <Link
                key={x + 1}
                to={`x + 1`}
              >
                <span>{x + 1}</span>
              </Link>
            )).slice(0, 10)}
          </div>
        )}
      </div>

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <p><img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} width="240" /></p>
            <h2><Link to={`/movies/${movie.id}?api_key=${process.env.REACT_APP_APIKEY}`}>{movie.original_title}</Link></h2>
            <div>
              {movie.overview}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Movies;