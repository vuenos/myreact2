import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Movies, Movie } from './pages';

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" elemant={<Movie />} />
      </Routes>
    </div>
  );
};

export default App;
