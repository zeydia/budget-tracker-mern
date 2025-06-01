import React, { useState } from 'react';
import {
  Container, Paper, TextField, Button, Typography,
  Alert, Box
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, login } = useAuth();

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
    if (!formData.name || !formData.email || !formData.password) {
      setError('Veuillez remplir tous les champs ');
      return;
    }

    if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
        setError("Le format de l'email est incorrect");
        return;
    }

    if (formData.password.length < 8){
        setError("Choisissez un mot de passe d'au moins 8 caracteres");
        return;

    }

    setLoading(true);
    try {
      setLoading(true);
      await register(formData.name, formData.email, formData.password);
      
    } catch (err) {
      setError("Email incorrect ou déjà utilisé");
      setLoading(true);
    } 
    setLoading(false);
    
  };
  


  return (
    <Container maxWidth="sm" sx={{ mt: '80px' }}>
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Créer un compte
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error} </Alert>}
          <form >
            <TextField
              fullWidth
              label="Nom Complet"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
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
              onClick={handleSubmit}
            >
              {loading ? 'Création du compte... ' : 'Enregitrer'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};
export default Register;