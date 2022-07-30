import React, { useState, useEffect } from 'react';
import { Fade } from '@mui/material';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import apiClient from '../service/api';
import {
    img_500,
    unavailable,
    unavailableLandscape
} from '../config/config';
import './ContentModal.css';
import { YouTube } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import Carousel from './Carousel';

const Paper = styled('div') (({ theme }) => ({
  width: "90%",
  height: "80%",
  backgroundColor: "#39445a",
  border: "1px solid #282c34",
  borderRadius: 10,
  color: "white",
  boxShadow: theme.shadows[5],
  padding: theme.spacing(1, 1, 3),
}));

const ContentModal = ({ children, media_type, id }) => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getData = async () => {
    const { data } = await apiClient.get(`/${media_type}/${id}?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`);
    
    setContent(data);
  }

  const getVideo = async () => {
    const { data } = await apiClient.get(`/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_APIKEY}&language=en-US`);

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    getData();
    getVideo();
  }, []);
  
  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
      <Modal
        className="ModalStyled"
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          {content && (
            <Paper>
              <div className='ContentModal'>
                <img 
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img 
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className='ContentModal__about'>
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                      {(
                        content.first_air_date ||
                        content.release_date ||
                        "-----"
                      ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className='ContentModal__description'>
                    {content.overview}
                  </span>

                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>
                  
                  <Button
                    variant='contained'
                    startIcon={<YouTube />}
                    color="secondary"
                    target="_blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
            </Paper>
          )}
        </Fade>
      </Modal>
    </>
  )
}

export default ContentModal;