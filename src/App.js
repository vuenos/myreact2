import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Movies, Movie } from './pages';
import Layout from './Layout';
import { Notfound } from './components';

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          {/* <Route path="/movies/:movieId" element={<Movie />} /> */}
          <Route path="*" element={<Notfound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
