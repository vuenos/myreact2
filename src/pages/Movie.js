import React, { useState, useEffect } from 'react'
import apiClient from '../service/api';
import { useParams } from 'react-router-dom';

const Movie = () => {
    const [loading, setLoading] = useState(false);
    const [movie, setMovie] = useState({});
    const params = useParams();

    const getMovie = async () => {
        try {
            const { data, status } = await apiClient(`/popular/?api_key=${process.env.REACT_APP_APIKEY}/${params.movieId}`);
            if (status === 200) {
                setLoading(true);
                setMovie(data);
            }
            console.log('MOVIE:::', data)

        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getMovie();
    }, [])

    return (
        <div>
            <h1>Movie{params.movieId}</h1>
            <div>
                <p>{movie._id}</p>
            </div>
        </div>
    )
}

export default Movie;