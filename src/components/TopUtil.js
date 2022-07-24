import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopUtil = () => {
  const navigate = useNavigate();

  const goBack =()=> {
    navigate(-1);
  }

  return (
    <div>
      <button onClick={goBack}>Back</button>
    </div>
  )
}

export default TopUtil