import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axiosClient from '../utils/axiosClient';
import { Message } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
//import {jwtDecode} from 'jwt-decode';


// Actions pour le reducer
const AUTH_ACTIONS = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  LOAD_USER: 'LOAD_USER'
};

// Etat initial
let initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  token: '',
  isAuthenticated: false,
  message: '',
  loading: true
};

if (localStorage.getItem('token')){
  initialState = {
    ...initialState,
    isAuthenticated: true
  }
}

// Reducer pour gerer les changements d' etat
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        message: 'Connecté',
        loading: false
      };
    case AUTH_ACTIONS.LOGOUT:
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        message: 'Deconnexion',
        loading: false
      };
    case AUTH_ACTIONS.LOAD_USER:
      return {
        ...state,
        user: action.payload.user,
        token: localStorage.getItem('token'),
        isAuthenticated: true,
        message: 'Refresh',
        loading: false
      };
    default:
      return state;
  }
};
// Creation du contexte
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Fonction de connexion
  const login = async (email, password) => {
    try {
      const res = await axiosClient.post('/api/auth/login', { email, password });
      console.log(res.data)
      // Stocker le token
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      // Configurer axios
      axiosClient.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      // Mettre a jour l'etat
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: res.data });

    } catch (error) {
      console.error('Erreur de connexion :', error);
      throw new Error("Erreur de connexion");
    }
  };

  const logout = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  }

  const register = async (name, email, password) => {
    try {
      const res = await axiosClient.post('/api/auth/register', { name, email, password });
      // Stocker le token
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      // Configurer axios
      axiosClient.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      // Mettre a jour l'etat
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: res.data });

    } catch (error) {
      throw new Error("Erreur de la creation de compte");
    }
  };

  console.log(state);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
// Hook personnalise
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};