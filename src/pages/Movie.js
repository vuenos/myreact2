import React, { useState, useEffect } from 'react'
import apiClient from '../service/api';
import { useParams } from 'react-router-dom';
import { TopUtil } from '../components';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Movie = () => {
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});
    const params = useParams();

    const getMovie = async () => {
        try {
            const { data, status } = await apiClient(`/${params.movieId}?api_key=${process.env.REACT_APP_APIKEY}`);
            if (status === 200) {
                setLoading(true);
                setMovie(data);
                console.log('MOVIE:::', data);
            }

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getMovie();
    }, [])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <TopUtil />
            <Typography variant="h2" component="h2" gutterBottom>
                {movie.original_title} <sup>{params.movieId}</sup>
            </Typography>

            <div>
                <p><img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} width="240" /></p>
                <div>
                    {movie.overview}
                </div>
                <ul>
                    <li>Release date : {movie.release_date}</li>
                    <li>Homepage : <a href={movie.homepage} target="_blank">{movie.homepage}</a></li>
                </ul>
            </div>
        </Box>
    )
}

export default Movie;