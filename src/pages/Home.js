import React from 'react';
import apiClient from '../service/api';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const Home =()=> {
    return (
        <Box sx={{ width: '100%', maxWidth: 1280 }}>
           <Typography variant="h2" gutterBottom component="h2">
                Movies
            </Typography>

            <Typography variant="h2" gutterBottom component="h2">
                Populars
            </Typography>
        </Box>
        
    );
}

export default Home;