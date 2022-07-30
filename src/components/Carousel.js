import React, { useState, useEffect } from 'react';
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import apiClient from '../service/api';
import { img_300, noPicture } from '../config/config';
import "./Carousel.css";

const handleDragStart = (e) => e.preventDefault();

const Carousel = ({ id, media_type }) => {
  const [credits, setCredits] = useState([]);

  const items = credits.map((c) => (
    <div className='carouselItem'>
      <img 
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className="carouselItem_img"
      />
      <b className="carouselItem_txt">{c?.name}</b>
    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    }
  };

  const getCredits = async () => {
    const { data } = await apiClient.get(`/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`);

    setCredits(data.cast);
  }

  useEffect(() => {
    getCredits();
  }, [])

  return (
    <AliceCarousel 
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
      autoPlayInterval="800"
    />
  )
}

export default Carousel;