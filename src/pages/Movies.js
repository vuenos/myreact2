import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../service/api';
import { TopUtil } from '../components';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Paginate from '../components/Paginate';

const Movies = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(10)
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const {data, status} = await apiClient.get(`/popular?api_key=${process.env.REACT_APP_APIKEY}&page=${page}`);
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
  }, [page]);

  return (
    <div>
      <TopUtil />
      <h1>Movies</h1>
      {loading && <div>Loading....</div>}

      <Paginate setPage={setPage} pageNumber={numberOfPages} />

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {movies && movies.map((movie) => (
            <Grid item xs={2} sm={4} md={4} key={movie.id}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.original_title}
                  />

                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      <Link to={`/movies/${movie.id}?api_key=${process.env.REACT_APP_APIKEY}`}>{movie.original_title}</Link>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {movie.overview}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  )
}

export default Movies;