import React, { createContext, useContext, useReducer, useEffect } from 'react';
// import axiosClient from '../utils/axiosClient';

// TODO-CONTEXT-1: Configuration authentification
//
// OBJECTIF: Créer le contexte global pour l'authentification
//
// QUE FAIT CE CODE: Gère l'état de connexion dans toute l'application.
//
// INSTRUCTIONS: Consultez la section "TODO-CONTEXT-1" du lab PDF
//
// ÉTAPES À COMPLÉTER:
// 1. Définir AUTH_ACTIONS (LOGIN_SUCCESS, LOGOUT, LOAD_USER)
// 2. Créer initialState avec user, token, isAuthenticated, loading
// 3. Implémenter authReducer avec switch case
// 4. Créer AuthProvider avec useReducer
// 5. Implémenter login function avec axiosClient
// 6. Créer useAuth hook personnalisé
//
// RAPPEL: Le code complet est dans le lab PDF à la section TODO-CONTEXT-1

import axiosClient from '../utils/axiosClient';

// Actions pour le reducer
const AUTH_ACTIONS = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT',
  LOAD_USER: 'LOAD_USER'
};

// Etat initial
const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true
};

// Reducer pour gerer les changements d' etat
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false
      };
    case AUTH_ACTIONS.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
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
      // Stocker le token
      localStorage.setItem('token', res.data.data.token);
      // Configurer axios
      axiosClient.defaults.headers.common['Authorization'] = `Bearer ${ res.data.data.token }`;
      // Mettre a jour l'etat
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: res.data.data });
    } catch (error) {
      console.error('Erreur de connexion :', error);
    }
  };
  
  return (
    <AuthContext.Provider value={{ ...state, login, logout: () => dispatch({ type: AUTH_ACTIONS.LOGOUT }) }}>
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