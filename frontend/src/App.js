import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';
//Contexts
import { AuthProvider, useAuth } from './contexts/AuthContext';
//Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateNavbar from './components/layout/PrivateNavbar';
import PublicNavbar from './components/layout/PublicNavbar';
import Sidebar from './components/layout/Sidebar';
import CategoryPage from './pages/CategoryPage';
import TransactionPage from './pages/TransactionPage';
import Home from './pages/Home';

//Theme Material-UI personnalise
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto","Helvetica","Arial", sans-serif',
  },
});
//Composant pour proteger les routes privees
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading, load } = useAuth();

  return isAuthenticated ? <><Sidebar />{children}</> : <Navigate to="/" />;
};
//Composant pour rediriger si deja connecte
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};
function AppContent() {
  const { isAuthenticated, load } = useAuth();
  
  return (
    <div className="App">
      
      {isAuthenticated ? <PrivateNavbar /> : <PublicNavbar />}

      <Box sx={{ display: 'flex' }}>
      <Routes>
        {/* Routes publiques */}
        <Route path="/home" element={<PublicRoute><Home /></PublicRoute>}/>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}/>
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>}/>
        {/* Routes privees */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}/>
        <Route path="/categories" element={<PrivateRoute><CategoryPage /></PrivateRoute>}/>
        <Route path="/transactions" element={<PrivateRoute><TransactionPage /></PrivateRoute>}/>
        {/* Redirection par defaut */}

        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/home"} />}/>
        <Route path="*" element={<Navigate to={"/"} />}/>
      </Routes>
      </Box>
    </div>
  );
}
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={fr}>
        <AuthProvider>
          <Router>
            <AppContent />
          </Router>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;