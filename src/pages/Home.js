import React from 'react';
import apiClient from '../service/api';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useQuery } from 'react-query';

const Home =()=> {
    const { isLoading, error, data } = useQuery(['repoData'], () => fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res => res.json()
        )
    )

    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred:' + error.message

    return (
        <Box sx={{ width: '100%', maxWidth: 1280 }}>
           <Typography variant="h2" gutterBottom component="h2">
                {data.name}
            </Typography>
            <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>

            <Typography variant="h2" gutterBottom component="h2">
                Populars
            </Typography>
        </Box>
        
    );
}

export default Home;