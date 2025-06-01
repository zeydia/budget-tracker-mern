import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Grid } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const PublicNavbar = () => {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };

  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Budget Tracker IPSL
        </Typography>
          <Grid>
          <Button color="inherit" href="/login">
            Connexion
          </Button>
          <Button color="inherit" href="/register" variant="outlined">
              Creer un compte
            </Button>
          </Grid>

      </Toolbar>
    </AppBar>
  );
};
export default PublicNavbar;