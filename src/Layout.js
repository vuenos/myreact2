import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from './components';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const Layout = () => {
  return (
    <div>
        <Header />
        <main>
            <CssBaseline />
            <Container maxWidth="xl">
                <Box sx={{ height: '100%' }}>
                    <Outlet />
                </Box>
            </Container>
        </main>
        <Footer />
    </div>
  )
}

export default Layout;