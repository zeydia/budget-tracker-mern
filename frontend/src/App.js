import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { fr } from 'date-fns/locale';
//Contexts
import { AuthProvider, useAuth } from './contexts/AuthContext';
//Components
import Navbar from './components/Navbar';
import Login from './components/auth/Login';
// import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
// import CategoryList from './components/categories/CategoryList';
// import TransactionList from './components/transactions/TransactionList';
//Theme Material-UI personnalise
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976 d2',
    },
    secondary: {
      main: '# dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto","Helvetica","Arial", sans-serif',
  },
});
//Composant pour proteger les routes privees
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div> Chargement ... </div>;
  }
  return isAuthenticated ? children : <Navigate to="/login" />;
};
//Composant pour rediriger si deja connecte
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div> Chargement ... </div>;
  }
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};
function AppContent() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="App">
      {isAuthenticated && <Navbar />}
      <Routes>
        {/* Routes publiques */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        {/* Routes privees */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <CategoryList />
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <TransactionList />
            </PrivateRoute>
          }
        />
        {/* Redirection par defaut */}
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} />
          }
        />
      </Routes>
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