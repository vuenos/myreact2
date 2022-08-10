import React, { useState, useEffect } from 'react';
import apiClient from '../service/api';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const Home =({ media_type, id })=> {
  const [movie, setMovie] = useState([])
    
    const getVideo = async () => {
      const { data } = await apiClient.get(`/${media_type}/${id}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`);
  
      try {
        setMovie(data.results);
      } catch(err) {
        //
      }
    };

    useEffect(() => {
      setMovie();
    }, []);
    

    return (
        <Box sx={{ width: '100%', maxWidth: 1280 }}>
           <Typography variant="h2" gutterBottom component="h2">
                {movie.name}
            </Typography>
        </Box>
        
    );
}

export default Home;