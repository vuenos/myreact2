import React, { useState, useEffect } from 'react';
import apiClient from '../service/api';
import {
  img_500,
  unavailable
} from '../config/config';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
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
           <Card sx={{ maxWidth: 345 }} key={movie.id}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={movie.poster_path
                  ? `${img_500}/${movie.poster_path}`
                  : unavailable}
                alt={movie.title}
               />
              <CardContent>
              
                <Typography gutterBottom variant="h5" component="h5">
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.overview}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
           </Card>
          ))}
        </Box>
        
    );
}

export default Home;