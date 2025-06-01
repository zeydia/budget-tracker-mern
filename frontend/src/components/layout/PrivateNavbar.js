import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Link } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const PrivateNavbar = () => {
  const { user, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  
  return (
    <AppBar position="fixed" color="primary">
      <Toolbar>
        <Link href="/" sx={{ flexGrow: 1 }} color="inherit">
        <Typography variant="h6" >
          Budget Tracker IPSL
        </Typography>
        </Link>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              Bonjour , {user.name}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Deconnexion
            </Button>
          </Box>
      </Toolbar>
    </AppBar>
  );
};
export default PrivateNavbar;