import React, { useState } from 'react';
import {
  Container, Paper, TextField, Button, Typography,
  Alert, Box
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Effacer les erreurs lors de la saisie
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation simple
    if (!formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs ');
      return;
    }
    setLoading(true);
    try {
      await login(formData.email, formData.password);
    } catch (err) {
      setError('Email ou mot de passe incorrect ');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: '80px'}}>
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Connexion
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error} </Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Mot de passe"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? 'Connexion ... ' : 'Se connecter '}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};
export default Login;