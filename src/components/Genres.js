import React, { useEffect } from 'react';
import apiClient from '../service/api';
import { Chip, generateUtilityClasses } from '@mui/material';

const Genres = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage
}) => {

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  const getGenres = async () => {
    const { data } = await apiClient.get(`/genre/${type}/list?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`);
    setGenres(data.genres)
  }

  useEffect(() => {
    getGenres();
    return () => {
        setGenres({});
    }
  }, [])


  return (
    <div>
        {selectedGenres.map((genre) => (
            <Chip
                style={{ margin: 2 }}
                label={genre.name}
                key={genre.id}
                color="primary"
                clickable
                size="small"
                onDelete={() => handleRemove(genre)}
            />
        ))}
        {genres.map((genre) => (
            <Chip 
                style={{ margin: 2 }}
                label={genre.name}
                key={genre.id}
                clickable
                size="small"
                onClick={() => handleAdd(genre)}
            />
        ))}
    </div>
  )
}

export default Genres;