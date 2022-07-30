import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../service/api';
import { TopUtil } from '../components';
import Genres from '../components/Genres';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import Chip from '@mui/material/Chip';
import Paginate from '../components/Paginate';
import useGenre from '../hooks/useGenre';
import MovieContent from '../components/MovieContent';

const Movies = () => {
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();
  const [movies, setMovies] = useState([]);
  const genreforURL = useGenre(selectedGenres);

  const getMovies = async () => {
    try {
      const {data, status} = await apiClient.get(`/movie/popular?api_key=${process.env.REACT_APP_APIKEY}&page=${page}&with_genres=${genreforURL}`);
      setMovies(data?.results);
        setLoading(false);
        setNumberOfPages(data?.total_pages);
        console.log('MOVIE_DATA', data.results);

    } catch(error) {
      //
      console.log(error.message);
    }
  }

  useEffect(()=> {
    getMovies();
  }, [genreforURL, page]);

  return (
    <Box sx={{ pb: 13 }}>
      <h1>Movies</h1>
      {loading && <div>Loading....</div>}

      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />

      <Box sx={{ flexGrow: 1, mt: 4 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {movies && movies.map((movie) => (
            <MovieContent 
              key={movie.id}
              id={movie.id}
              poster={movie.poster_path}
              title={movie.title || movie.name}
              date={movie.first_air_date || movie.release_date}
              media_type="movie"
              vote_average={movie.vote_average}
            />
            // <Grid item xs={2} sm={4} md={4} key={movie.id}>
            //   <Card>
            //     <CardActionArea>
            //       <CardMedia
            //         component="img"
            //         image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            //         alt={movie.original_title}
            //       />

            //       <CardContent>
            //         <Typography gutterBottom variant="h5" component="div">
            //           <Link to={`/movies/${movie.id}?api_key=${process.env.REACT_APP_APIKEY}`}>{movie.original_title}</Link>
            //         </Typography>
            //         <Typography variant="body2" color="text.secondary">
            //           {movie.overview.slice(0, 160)} ...
            //         </Typography>
            //         <Chip 
            //           color={movie.vote_average > 6.9 ? "warning" : "default"}
            //           sx={{ mt: 2 }}
            //           icon={<DoneIcon />}
            //           label={movie.vote_average}
            //           />
            //           <Chip
            //             label={movie.genre_ids}
            //           />
            //       </CardContent>
            //     </CardActionArea>
            //   </Card>
            // </Grid>
          ))}
        </Grid>
      </Box>

      {numberOfPages > 1 && (
        <Paginate setPage={setPage} numberOfPages={numberOfPages} />
      )}
    </Box>
  )
}

export default Movies;