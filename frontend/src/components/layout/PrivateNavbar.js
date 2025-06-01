import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const PrivateNavbar = () => {
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