import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Movies } from './pages';

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
      </Routes>
    </div>
  );
};

export default App;
