import React, { useState, useEffect } from 'react';
import apiClient from '../service/api';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const Home =()=> {
  const [movies, setMovies] = useState([])
    
    const getVideo = async () => {
      const { data } = await apiClient.get(`/movie/popular?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`);
  
      try {
        setMovies(data.results);
      } catch(err) {
        //
      }
    };

    useEffect(() => {
      getVideo();
    }, []);
    

    return (
        <Box sx={{ width: '100%', maxWidth: 1280 }}>
           {movies.map((movie) => (
            <Typography variant="h2" gutterBottom component="h2" key={movie.id}>
              {movie.title}
            </Typography>
           ))}
        </Box>
        
    );
}

export default Home;