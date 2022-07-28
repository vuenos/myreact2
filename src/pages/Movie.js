import React, { useState, useEffect } from 'react'
import apiClient from '../service/api';
import { useParams } from 'react-router-dom';
import { TopUtil } from '../components';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Movie = () => {
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});
    const params = useParams();

    const getMovie = async () => {
        try {
            const { data, status } = await apiClient(`/movie/${params.movieId}?api_key=${process.env.REACT_APP_APIKEY}`);
            if (status === 200) {
                setLoading(true);
                setMovie(data);
                console.log('MOVIE:::', data);
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    const sectionStyles = {
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.poster_path}')`,
        backgroundSize: 'cover'
    }

    useEffect(() => {
        getMovie();
    }, [])

    return (
        <Box sx={{ flexGrow: 1, pt: 3, pb: 10 }}>
            <TopUtil />

            <Grid container maxWidth="xl" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={sectionStyles}>
                <Grid item xs={4}>
                    <p><img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} width="100%" /></p>
                </Grid>

                <Grid item xs={6}>
                    <Typography variant="h2" component="h2" gutterBottom>
                        {movie.original_title} <sup>{params.movieId}</sup>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {movie.overview}
                    </Typography>
                    <ul>
                        <li>Release date : {movie.release_date}</li>
                        <li>Homepage : <a href={movie.homepage} target="_blank">{movie.homepage}</a></li>
                    </ul>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Movie;