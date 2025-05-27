#!/bin/bash

# =============================================================================
# Script de génération du code de départ - Budget Tracker MERN
# Génère tous les fichiers avec TODOs à compléter selon le lab PDF
# Auteur: Dr. El Hadji Bassirou TOURE - DMI/FST/UCAD
# =============================================================================

set -e  # Arrêter le script en cas d'erreur

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Fonction d'affichage avec couleurs
print_message() {
    local color=$1
    local message=$2
    echo -e "${color}[$(date +'%H:%M:%S')] ${message}${NC}"
}

print_info() {
    print_message $BLUE "📝 $1"
}

print_success() {
    print_message $GREEN "✅ $1"
}

print_warning() {
    print_message $YELLOW "⚠️  $1"
}

print_error() {
    print_message $RED "❌ $1"
}

print_todo() {
    print_message $PURPLE "📋 $1"
}

# Fonction pour créer la structure du projet
create_project_structure() {
    print_info "Création de la structure du projet..."
    
    # Backend structure
    mkdir -p backend/{config,controllers,middleware,models,routes,utils,logs}
    
    # Frontend structure
    mkdir -p frontend/{public,src}
    mkdir -p frontend/src/{components,contexts,hooks,utils,pages}
    mkdir -p frontend/src/components/{auth,categories,dashboard,transactions}
    mkdir -p frontend/src/pages
    
    # Root files
    mkdir -p docs
    mkdir -p scripts
    
    print_success "Structure du projet créée"
}

# ===============================
# BACKEND FILES GENERATION
# ===============================

generate_backend_package_json() {
    print_todo "Génération backend/package.json"
    
    cat > backend/package.json << 'EOL'
{
  "name": "mern-budget-tracker-backend",
  "version": "1.0.0",
  "description": "Backend API pour application de gestion budgétaire - Lab MERN UCAD",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  },
  "keywords": ["mern", "budget", "api", "ucad"],
  "author": "Dr. El Hadji Bassirou TOURE - DMI/FST/UCAD",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.5.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "express-rate-limit": "^6.10.0",
    "helmet": "^7.0.0",
    "express-mongo-sanitize": "^2.2.0",
    "xss-clean": "^0.1.4",
    "hpp": "^0.2.3"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.6.4",
    "supertest": "^6.3.3"
  }
}
EOL
    print_success "backend/package.json généré"
}

generate_server_js() {
    print_todo "Génération server.js avec TODO-SERVER-1"
    
    cat > backend/server.js << 'EOL'
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

// TODO-SERVER-1: Création du serveur Express de base
// 
// OBJECTIF: Comprendre la structure d'un serveur Express
// 
// QUE FAIT CE CODE: Crée un serveur web qui écoute sur le port 5000 
// et répond aux requêtes HTTP.
//
// INSTRUCTIONS: Consultez la section "TODO-SERVER-1" du lab PDF
// et remplacez ce commentaire par le code Express complet
//
// ÉTAPES À COMPLÉTER:
// 1. Créer l'application Express avec express()
// 2. Configurer les middleware (express.json(), cors())
// 3. Ajouter la route de test /api/health
// 4. Démarrer le serveur avec app.listen()
//
// RAPPEL: Le code complet est dans le lab PDF à la section TODO-SERVER-1

console.log('🚧 TODO-SERVER-1: Serveur Express à configurer');
console.log('📚 Consultez le lab PDF section "TODO-SERVER-1"');

// Serveur de base temporaire - À REMPLACER
const app = express();

app.get('/', (req, res) => {
  res.json({ 
    message: '🚧 TODO-SERVER-1 à compléter',
    instructions: 'Consultez le lab PDF section TODO-SERVER-1',
    nextSteps: [
      '1. Configurer Express et middleware',
      '2. Ajouter la route /api/health', 
      '3. Démarrer le serveur sur le port 5000'
    ]
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur temporaire démarré sur le port ${PORT}`);
  console.log('📋 Complétez TODO-SERVER-1 pour un serveur fonctionnel');
});
EOL
    print_success "server.js avec TODO-SERVER-1 généré"
}

generate_database_config() {
    print_todo "Génération config/database.js avec TODO-DB-1"
    
    cat > backend/config/database.js << 'EOL'
const mongoose = require('mongoose');

// TODO-DB-1: Connexion à MongoDB
//
// OBJECTIF: Établir la connexion entre Node.js et MongoDB
//
// QUE FAIT CE CODE: Se connecte à la base de données MongoDB 
// avec gestion d'erreurs.
//
// INSTRUCTIONS: Consultez la section "TODO-DB-1" du lab PDF
// 
// ÉTAPES À COMPLÉTER:
// 1. Créer la fonction connectDB async
// 2. Utiliser mongoose.connect() avec process.env.MONGO_URI
// 3. Gérer les erreurs avec try/catch
// 4. Afficher un message de succès avec conn.connection.host
// 5. Exporter la fonction avec module.exports
//
// RAPPEL: Le code complet est dans le lab PDF à la section TODO-DB-1

console.log('🚧 TODO-DB-1: Connexion MongoDB à configurer');

// Fonction temporaire - À REMPLACER par le code du lab
const connectDB = async () => {
  console.log('📚 TODO-DB-1: Implémentez la connexion MongoDB selon le lab PDF');
  console.log('💡 Utilisez mongoose.connect() avec gestion d\'erreurs async/await');
};

module.exports = connectDB;
EOL
    print_success "config/database.js avec TODO-DB-1 généré"
}

generate_user_model() {
    print_todo "Génération models/User.js avec TODO-MODEL-1"
    
    cat > backend/models/User.js << 'EOL'
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// TODO-MODEL-1: Modèle User sécurisé
//
// OBJECTIF: Créer le modèle utilisateur avec hachage de mot de passe
//
// QUE FAIT CE CODE: Définit la structure d'un utilisateur et hache 
// automatiquement son mot de passe.
//
// INSTRUCTIONS: Consultez la section "TODO-MODEL-1" du lab PDF
//
// ÉTAPES À COMPLÉTER:
// 1. Créer UserSchema avec name, email, password
// 2. Ajouter validations (required, unique, match pour email)
// 3. Implémenter pre('save') middleware pour hacher password
// 4. Ajouter méthode matchPassword pour comparaison
// 5. Exporter le modèle avec mongoose.model()
//
// RAPPEL: Le code complet est dans le lab PDF à la section TODO-MODEL-1

console.log('🚧 TODO-MODEL-1: Modèle User à implémenter');

// Schema temporaire - À REMPLACER par le code du lab
const UserSchema = new mongoose.Schema({
  // TODO: Implémentez le schéma complet selon le lab PDF
  placeholder: {
    type: String,
    default: 'TODO-MODEL-1 à compléter selon le lab PDF'
  }
}, { timestamps: true });

// TODO: Ajoutez le middleware pre('save') pour hacher le password
// TODO: Ajoutez la méthode matchPassword
// Consultez le lab PDF section TODO-MODEL-1

module.exports = mongoose.model('User', UserSchema);
EOL
    print_success "models/User.js avec TODO-MODEL-1 généré"
}

generate_category_model() {
    print_todo "Génération models/Category.js avec TODO-MODEL-2"
    
    cat > backend/models/Category.js << 'EOL'
const mongoose = require('mongoose');

// TODO-MODEL-2: Modèle Category
//
// OBJECTIF: Créer le modèle pour les catégories de transactions
//
// QUE FAIT CE CODE: Définit la structure des catégories 
// (Transport, Alimentation, etc.)
//
// INSTRUCTIONS: Consultez la section "TODO-MODEL-2" du lab PDF
//
// ÉTAPES À COMPLÉTER:
// 1. Créer CategorySchema avec name, type, color, user
// 2. Configurer enum pour type (income/expense)
// 3. Ajouter référence vers User avec ObjectId
// 4. Ajouter validations et valeurs par défaut
// 5. Exporter le modèle
//
// RAPPEL: Le code complet est dans le lab PDF à la section TODO-MODEL-2

console.log('🚧 TODO-MODEL-2: Modèle Category à implémenter');

// Schema temporaire - À REMPLACER par le code du lab
const CategorySchema = new mongoose.Schema({
  // TODO: Implémentez le schéma complet selon le lab PDF
  placeholder: {
    type: String,
    default: 'TODO-MODEL-2 à compléter selon le lab PDF'
  }
}, { timestamps: true });

module.exports = mongoose.model('Category', CategorySchema);
EOL
    print_success "models/Category.js avec TODO-MODEL-2 généré"
}

generate_transaction_model() {
    print_todo "Génération models/Transaction.js avec TODO-MODEL-3"
    
    cat > backend/models/Transaction.js << 'EOL'
const mongoose = require('mongoose');

// TODO-MODEL-3: Modèle Transaction
//
// OBJECTIF: Créer le modèle principal pour les transactions financières
//
// QUE FAIT CE CODE: Définit une transaction avec montant, description, 
// catégorie et utilisateur.
//
// INSTRUCTIONS: Consultez la section "TODO-MODEL-3" du lab PDF
//
// ÉTAPES À COMPLÉTER:
// 1. Créer TransactionSchema avec description, amount, type, category, user, date
// 2. Configurer validations (required, min pour amount)
// 3. Ajouter références vers Category et User
// 4. Configurer enum pour type
// 5. Exporter le modèle
//
// RAPPEL: Le code complet est dans le lab PDF à la section TODO-MODEL-3

console.log('🚧 TODO-MODEL-3: Modèle Transaction à implémenter');

// Schema temporaire - À REMPLACER par le code du lab
const TransactionSchema = new mongoose.Schema({
  // TODO: Implémentez le schéma complet selon le lab PDF
  placeholder: {
    type: String,
    default: 'TODO-MODEL-3 à compléter selon le lab PDF'
  }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);
EOL
    print_success "models/Transaction.js avec TODO-MODEL-3 généré"
}

generate_jwt_utils() {
    print_todo "Génération utils/generateToken.js avec TODO-AUTH-1"
    
    cat > backend/utils/generateToken.js << 'EOL'
const jwt = require('jsonwebtoken');

// TODO-AUTH-1: Génération de tokens JWT
//
// OBJECTIF: Créer des tokens JWT pour l'authentification
//
// QUE FAIT CE CODE: Génère un token signé contenant l'ID utilisateur.
//
// INSTRUCTIONS: Consultez la section "TODO-AUTH-1" du lab PDF
//
// ÉTAPES À COMPLÉTER:
// 1. Créer la fonction generateToken qui prend un id en paramètre
// 2. Utiliser jwt.sign() avec payload { id }
// 3. Signer avec process.env.JWT_SECRET
// 4. Configurer expiresIn: '30d'
// 5. Retourner le token
//
// RAPPEL: Le code complet est dans le lab PDF à la section TODO-AUTH-1

console.log('🚧 TODO-AUTH-1: Génération JWT à implémenter');

// Fonction temporaire - À REMPLACER par le code du lab
const generateToken = (id) => {
  console.log('📚 TODO-AUTH-1: Implémentez generateToken selon le lab PDF');
  return 'TODO-AUTH-1-token-placeholder';
};

module.exports = generateToken;
EOL
    print_success "utils/generateToken.js avec TODO-AUTH-1 généré"
}

generate_auth_middleware() {
    print_todo "Génération middleware/auth.js avec TODO-AUTH-2"
    
    cat > backend/middleware/auth.js << 'EOL'
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// TODO-AUTH-2: Middleware d'authentification
//
// OBJECTIF: Vérifier les tokens dans les requêtes protégées
//
// QUE FAIT CE CODE: Extrait et vérifie le token JWT dans chaque 
// requête protégée.
//
// INSTRUCTIONS: Consultez la section "TODO-AUTH-2" du lab PDF
//
// ÉTAPES À COMPLÉTER:
// 1. Créer la fonction protect async
// 2. Extraire le token depuis req.headers.authorization
// 3. Vérifier le token avec jwt.verify()
// 4. Récupérer l'utilisateur avec User.findById()
// 5. Attacher l'utilisateur à req.user
// 6. Gérer les erreurs avec try/catch
//
// RAPPEL: Le code complet est dans le lab PDF à la section TODO-AUTH-2

console.log('🚧 TODO-AUTH-2: Middleware auth à implémenter');

// Middleware temporaire - À REMPLACER par le code du lab
const protect = async (req, res, next) => {
  console.log('📚 TODO-AUTH-2: Implémentez le middleware protect selon le lab PDF');
  res.status(401).json({ 
    message: 'TODO-AUTH-2: Middleware à compléter selon le lab PDF',
    instructions: 'Utilisez jwt.verify() et User.findById()'
  });
};

module.exports = { protect };
EOL
    print_success "middleware/auth.js avec TODO-AUTH-2 généré"
}

generate_category_controller() {
    print_todo "Génération controllers/categoryController.js avec TODO-CRUD-1"
    
    cat > backend/controllers/categoryController.js << 'EOL'
const Category = require('../models/Category');

// TODO-CRUD-1: API complète des catégories
//
// OBJECTIF: Implémenter les 4 opérations CRUD pour les catégories
//
// QUE FAIT CE CODE: Crée tous les endpoints REST pour gérer les catégories.
//
// INSTRUCTIONS: Consultez la section "TODO-CRUD-1" du lab PDF
//
// ÉTAPES À COMPLÉTER:
// 1. Implémenter getCategories - GET /api/categories
// 2. Implémenter createCategory - POST /api/categories  
// 3. Implémenter updateCategory - PUT /api/categories/:id
// 4. Implémenter deleteCategory - DELETE /api/categories/:id
// 5. Gérer les erreurs avec try/catch
// 6. Sécuriser avec user: req.user._id
//
// RAPPEL: Le code complet est dans le lab PDF à la section TODO-CRUD-1

console.log('🚧 TODO-CRUD-1: Contrôleurs CRUD à implémenter');

// Contrôleurs temporaires - À REMPLACER par le code du lab

// GET /api/categories - Lister toutes les catégories
const getCategories = async (req, res) => {
  console.log('📚 TODO-CRUD-1: Implémentez getCategories selon le lab PDF');
  res.json({ 
    success: false, 
    message: 'TODO-CRUD-1 à compléter',
    instructions: 'Utilisez Category.find({ user: req.user._id })'
  });
};

// POST /api/categories - Créer une nouvelle catégorie
const createCategory = async (req, res) => {
  console.log('📚 TODO-CRUD-1: Implémentez createCategory selon le lab PDF');
  res.status(501).json({ 
    success: false, 
    message: 'TODO-CRUD-1 à compléter' 
  });
};

// PUT /api/categories/:id - Modifier une catégorie
const updateCategory = async (req, res) => {
  console.log('📚 TODO-CRUD-1: Implémentez updateCategory selon le lab PDF');
  res.status(501).json({ 
    success: false, 
    message: 'TODO-CRUD-1 à compléter' 
  });
};

// DELETE /api/categories/:id - Supprimer une catégorie
const deleteCategory = async (req, res) => {
  console.log('📚 TODO-CRUD-1: Implémentez deleteCategory selon le lab PDF');
  res.status(501).json({ 
    success: false, 
    message: 'TODO-CRUD-1 à compléter' 
  });
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };
EOL
    print_success "controllers/categoryController.js avec TODO-CRUD-1 généré"
}

generate_category_routes() {
    print_todo "Génération routes/categories.js avec TODO-ROUTES-1"
    
    cat > backend/routes/categories.js << 'EOL'
const express = require('express');
const { 
  getCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} = require('../controllers/categoryController');
const { protect } = require('../middleware/auth');

// TODO-ROUTES-1: Routes des catégories
//
// OBJECTIF: Connecter les contrôleurs aux URL REST
//
// QUE FAIT CE CODE: Définit les routes HTTP pour accéder aux catégories.
//
// INSTRUCTIONS: Consultez la section "TODO-ROUTES-1" du lab PDF
//
// ÉTAPES À COMPLÉTER:
// 1. Créer le router Express
// 2. Protéger toutes les routes avec router.use(protect)
// 3. Configurer router.route('/') pour GET et POST
// 4. Configurer router.route('/:id') pour PUT et DELETE
// 5. Exporter le router
//
// RAPPEL: Le code complet est dans le lab PDF à la section TODO-ROUTES-1

console.log('🚧 TODO-ROUTES-1: Routes catégories à configurer');

const router = express.Router();

// TODO: Implémentez les routes selon le lab PDF
// Routes temporaires pour testing

router.get('/', (req, res) => {
  res.json({ 
    message: 'TODO-ROUTES-1 à compléter selon le lab PDF',
    instructions: 'Utilisez router.route() et middleware protect'
  });
});

module.exports = router;
EOL
    print_success "routes/categories.js avec TODO-ROUTES-1 généré"
}

generate_stats_controller() {
    print_todo "Génération controllers/statsController.js avec TODO-STATS-1"
    
    cat > backend/controllers/statsController.js << 'EOL'
const Transaction = require('../models/Transaction');

// TODO-STATS-1: Statistiques avec agrégation
//
// OBJECTIF: Calculer des statistiques budgétaires avec MongoDB
//
// QUE FAIT CE CODE: Calcule le total des dépenses par catégorie 
// avec les détails.
//
// INSTRUCTIONS: Consultez la section "TODO-STATS-1" du lab PDF
//
// ÉTAPES À COMPLÉTER:
// 1. Utiliser Transaction.aggregate() avec pipeline
// 2. $match pour filtrer par user et type expense
// 3. $group pour grouper par category avec $sum, $avg
// 4. $lookup pour joindre avec categories
// 5. $project pour restructurer le résultat
// 6. $sort par total décroissant
//
// RAPPEL: Le code complet est dans le lab PDF à la section TODO-STATS-1

console.log('🚧 TODO-STATS-1: Agrégation MongoDB à implémenter');

// GET /api/stats/categories - Statistiques par catégorie
const getCategoryStats = async (req, res) => {
  try {
    console.log('📚 TODO-STATS-1: Implémentez l\'agrégation selon le lab PDF');
    
    // TODO: Remplacer par le pipeline d'agrégation du lab PDF
    const stats = await Transaction.find({ user: req.user._id }).limit(1);
    
    res.json({ 
      success: false, 
      message: 'TODO-STATS-1 à compléter avec agrégation MongoDB',
      instructions: 'Utilisez Transaction.aggregate() avec $match, $group, $lookup',
      data: []
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getCategoryStats };
EOL
    print_success "controllers/statsController.js avec TODO-STATS-1 généré"
}

# ===============================
# FRONTEND FILES GENERATION
# ===============================

generate_frontend_package_json() {
    print_todo "Génération frontend/package.json"
    
    cat > frontend/package.json << 'EOL'
{
  "name": "mern-budget-tracker-frontend",
  "version": "1.0.0",
  "description": "Frontend React pour application de gestion budgétaire - Lab MERN UCAD",
  "private": true,
  "dependencies": {
    "@mui/material": "^5.14.5",
    "@mui/icons-material": "^5.14.3",
    "@mui/x-date-pickers": "^6.11.0",
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.15.0",
    "recharts": "^2.8.0",
    "axios": "^1.5.0",
    "date-fns": "^2.30.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "devDependencies": {
    "react-scripts": "5.0.1"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "keywords": ["react", "mern", "budget", "ucad"],
  "author": "Dr. El Hadji Bassirou TOURE - DMI/FST/UCAD"
}
EOL
    print_success "frontend/package.json généré"
}

generate_frontend_index() {
    print_todo "Génération frontend/src/index.js"
    
    cat > frontend/src/index.js << 'EOL'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOL
    print_success "frontend/src/index.js généré"
}

generate_app_js() {
    print_todo "Génération frontend/src/App.js avec TODO-ROUTER-1"
    
    cat > frontend/src/App.js << 'EOL'
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Typography, Box, Paper } from '@mui/material';
import './App.css';

// TODO-ROUTER-1: Configuration du routage
//
// OBJECTIF: Configurer la navigation entre les pages de l'application
//
// QUE FAIT CE CODE: Définit les routes et protège les pages privées.
//
// INSTRUCTIONS: Consultez la section "TODO-ROUTER-1" du lab PDF
//
// ÉTAPES À COMPLÉTER:
// 1. Importer les contextes (AuthProvider, useAuth)
// 2. Importer tous les composants (Login, Register, Dashboard, etc.)
// 3. Créer PrivateRoute pour protéger les routes authentifiées
// 4. Créer PublicRoute pour rediriger si déjà connecté
// 5. Configurer toutes les routes avec protection appropriée
//
// RAPPEL: Le code complet est dans le lab PDF à la section TODO-ROUTER-1

console.log('🚧 TODO-ROUTER-1: Configuration routing à implémenter');

// Thème temporaire
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' }
  }
});

// Composant temporaire en attendant le routage complet
function TodoPlaceholder() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom color="primary">
            🚧 Budget Tracker UCAD
          </Typography>
          <Typography variant="h5" gutterBottom>
            Application MERN en Construction
          </Typography>
          <Typography variant="body1" sx={{ mt: 3, mb: 2 }}>
            📚 <strong>TODO-ROUTER-1</strong> à compléter selon le lab PDF
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Instructions: Consultez la section "TODO-ROUTER-1 : Configuration du routage"
          </Typography>
          
          <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              🎯 Prochaines étapes:
            </Typography>
            <Typography variant="body2" component="div" sx={{ textAlign: 'left' }}>
              <ol>
                <li>Implémenter AuthProvider et useAuth context</li>
                <li>Créer les composants Login, Register, Dashboard</li>
                <li>Configurer PrivateRoute et PublicRoute</li>
                <li>Définir toutes les routes dans Routes</li>
                <li>Tester la navigation et les redirections</li>
              </ol>
            </Typography>
          </Box>
          
          <Typography variant="caption" display="block" sx={{ mt: 3 }}>
            Dr. El Hadji Bassirou TOURE - DMI/FST/UCAD
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* TODO: Remplacer par le routage complet du lab PDF */}
        <TodoPlaceholder />
      </Router>
    </ThemeProvider>
  );
}

export default App;
EOL
    print_success "frontend/src/App.js avec TODO-ROUTER-1 généré"
}

generate_auth_context() {
    print_todo "Génération frontend/src/contexts/AuthContext.js avec TODO-CONTEXT-1"
    
    cat > frontend/src/contexts/AuthContext.js << 'EOL'
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

console.log('🚧 TODO-CONTEXT-1: Context Auth à implémenter');

// Context temporaire - À REMPLACER par le code du lab
const AuthContext = createContext();

// Provider temporaire
export const AuthProvider = ({ children }) => {
  const contextValue = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    login: () => console.log('TODO-CONTEXT-1: Implémenter login'),
    logout: () => console.log('TODO-CONTEXT-1: Implémenter logout')
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook temporaire
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
EOL
    print_success "frontend/src/contexts/AuthContext.js avec TODO-CONTEXT-1 généré"
}

generate_navbar_component() {
    print_todo "Génération frontend/src/components/Navbar.js avec TODO-COMPONENT-1"
    
    cat > frontend/src/components/Navbar.js << 'EOL'
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
// import { useAuth } from '../contexts/AuthContext';

// TODO-COMPONENT-1: Premier composant React
//
// OBJECTIF: Créer un composant de navigation simple
//
// QUE FAIT CE CODE: Affiche une barre de navigation avec logo et menu.
//
// INSTRUCTIONS: Consultez la section "TODO-COMPONENT-1" du lab PDF
//
// ÉTAPES À COMPLÉTER:
// 1. Importer useAuth depuis AuthContext
// 2. Destructurer user et logout depuis useAuth()
// 3. Implémenter handleLogout function
// 4. Afficher conditionnellement selon user connecté
// 5. Ajouter navigation avec nom utilisateur
//
// RAPPEL: Le code complet est dans le lab PDF à la section TODO-COMPONENT-1

console.log('🚧 TODO-COMPONENT-1: Composant Navbar à implémenter');

const Navbar = () => {
  // TODO: Utiliser useAuth() pour récupérer user et logout
  const user = null; // Temporaire
  const logout = () => console.log('TODO: logout');

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Budget Tracker UCAD
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" color="inherit">
            🚧 TODO-COMPONENT-1 à compléter
          </Typography>
          <Button color="inherit" disabled>
            Navigation
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
EOL
    print_success "frontend/src/components/Navbar.js avec TODO-COMPONENT-1 généré"
}

generate_login_component() {
    print_todo "Génération frontend/src/components/auth/Login.js avec TODO-FORM-1"
    
    cat > frontend/src/components/auth/Login.js << 'EOL'
import React, { useState } from 'react';
import { 
  Container, Paper, TextField, Button, Typography, 
  Alert, Box 
} from '@mui/material';
// import { useAuth } from '../../contexts/AuthContext';

// TODO-FORM-1: Formulaire de connexion
//
// OBJECTIF: Créer l'interface de connexion utilisateur
//
// QUE FAIT CE CODE: Formulaire Material-UI avec validation et gestion d'erreurs.
//
// INSTRUCTIONS: Consultez la section "TODO-FORM-1" du lab PDF
//
// ÉTAPES À COMPLÉTER:
// 1. Importer useAuth depuis AuthContext
// 2. Gérer l'état du formulaire avec useState
// 3. Implémenter handleChange pour les champs
// 4. Implémenter handleSubmit avec validation
// 5. Utiliser login() depuis useAuth
// 6. Gérer loading et erreurs
//
// RAPPEL: Le code complet est dans le lab PDF à la section TODO-FORM-1

console.log('🚧 TODO-FORM-1: Formulaire Login à implémenter');

const Login = () => {
  // TODO: États et fonctions selon le lab PDF
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('TODO-FORM-1: Implémenter la soumission selon le lab PDF');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Connexion - Budget Tracker UCAD
          </Typography>
          
          <Alert severity="info" sx={{ mb: 2 }}>
            🚧 TODO-FORM-1 à compléter selon le lab PDF
          </Alert>
          
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              margin="normal"
              placeholder="exemple@ucad.edu.sn"
              disabled
            />
            
            <TextField
              fullWidth
              label="Mot de passe"
              name="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              margin="normal"
              disabled
            />
            
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              disabled
            >
              🚧 Compléter TODO-FORM-1
            </Button>
          </form>
          
          <Typography variant="caption" align="center" display="block">
            Consultez le lab PDF section TODO-FORM-1
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
EOL
    print_success "frontend/src/components/auth/Login.js avec TODO-FORM-1 généré"
}

generate_utils_files() {
    print_todo "Génération des fichiers utilitaires"
    
    # Backend .env
    cat > backend/.env << 'EOL'
# Configuration Base de données
MONGO_URI=mongodb://localhost:27017/budget-tracker-ucad

# Configuration JWT
JWT_SECRET=votre_secret_jwt_super_securise_minimum_32_caracteres_ucad_2025
JWT_EXPIRE=30d

# Configuration Serveur
PORT=5000
NODE_ENV=development

# Configuration CORS
CORS_ORIGIN=http://localhost:3000

# Configuration Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
EOL

    # Frontend CSS
    cat > frontend/src/index.css << 'EOL'
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

/* Styles pour les TODOs */
.todo-highlight {
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
}
EOL

    cat > frontend/src/App.css << 'EOL'
.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  padding: 20px;
  color: white;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
}

.todo-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 8px;
  margin: 1rem 0;
}

.todo-instructions {
  background-color: #f8f9fa;
  border-left: 4px solid #007bff;
  padding: 1rem;
  margin: 1rem 0;
}
EOL

    # HTML public
    cat > frontend/public/index.html << 'EOL'
<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Application de gestion budgétaire pour étudiants UCAD" />
    <title>Budget Tracker UCAD - Lab MERN</title>
  </head>
  <body>
    <noscript>Vous devez activer JavaScript pour utiliser cette application.</noscript>
    <div id="root"></div>
  </body>
</html>
EOL

    print_success "Fichiers utilitaires générés"
}

generate_docker_files() {
    print_todo "Génération des fichiers Docker"
    
    # Docker Compose
    cat > docker-compose.yml << 'EOL'
version: '3.8'

services:
  # Base de données MongoDB
  mongodb:
    image: mongo:6.0
    container_name: budget-mongo-dev
    restart: unless-stopped
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_DATABASE: budget-tracker-ucad
    networks:
      - budget-network

  # Backend API Node.js
  backend:
    build: ./backend
    container_name: budget-backend-dev
    restart: unless-stopped
    ports:
      - "5000:5000"
    volumes:
      - ./backend:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - MONGO_URI=mongodb://mongodb:27017/budget-tracker-ucad
    depends_on:
      - mongodb
    networks:
      - budget-network

  # Frontend React
  frontend:
    build: ./frontend
    container_name: budget-frontend-dev
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - REACT_APP_API_URL=http://localhost:5000
      - CHOKIDAR_USEPOLLING=true
    depends_on:
      - backend
    networks:
      - budget-network

volumes:
  mongodb_data:

networks:
  budget-network:
    driver: bridge
EOL

    # Dockerfile Backend
    cat > backend/Dockerfile << 'EOL'
FROM node:18-alpine

WORKDIR /app

# Copier package.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 5000

# Commande de démarrage
CMD ["npm", "run", "dev"]
EOL

    # Dockerfile Frontend
    cat > frontend/Dockerfile << 'EOL'
FROM node:18-alpine

WORKDIR /app

# Copier package.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "start"]
EOL

    print_success "Fichiers Docker générés"
}

generate_readme_todos() {
    print_todo "Génération README-TODOS.md"
    
    cat > README-TODOS.md << 'EOL'
# 📋 Liste des TODOs à Compléter - Budget Tracker MERN

> **Guide de référence pour le lab pratique**  
> Dr. El Hadji Bassirou TOURE - DMI/FST/UCAD

## 🎯 Vue d'Ensemble

Ce projet contient **12 TODOs principaux** à compléter en suivant le lab PDF. Chaque TODO correspond à une section spécifique du laboratoire.

## 📁 Organisation par Partie

### 🔧 PARTIE 1: Backend Fondamental

#### `TODO-SERVER-1` - Configuration Express
- **Fichier**: `backend/server.js`
- **Section Lab**: "TODO-SERVER-1 : Création du serveur Express de base"
- **Objectif**: Configurer Express avec middleware, CORS et route de test
- **Points clés**: `express()`, `app.use()`, `app.listen()`

#### `TODO-DB-1` - Connexion MongoDB  
- **Fichier**: `backend/config/database.js`
- **Section Lab**: "TODO-DB-1 : Connexion à MongoDB"
- **Objectif**: Établir la connexion avec Mongoose et gestion d'erreurs
- **Points clés**: `mongoose.connect()`, `async/await`, `try/catch`

#### `TODO-MODEL-1` - Modèle User Sécurisé
- **Fichier**: `backend/models/User.js`
- **Section Lab**: "TODO-MODEL-1 : Modèle User sécurisé"
- **Objectif**: Schéma utilisateur avec hachage mot de passe
- **Points clés**: `bcrypt`, `pre('save')`, `methods.matchPassword`

#### `TODO-AUTH-1` - Génération JWT
- **Fichier**: `backend/utils/generateToken.js`
- **Section Lab**: "TODO-AUTH-1 : Génération de tokens JWT"
- **Objectif**: Créer des tokens JWT signés
- **Points clés**: `jwt.sign()`, `process.env.JWT_SECRET`

#### `TODO-AUTH-2` - Middleware Auth
- **Fichier**: `backend/middleware/auth.js`
- **Section Lab**: "TODO-AUTH-2 : Middleware d'authentification"
- **Objectif**: Vérifier tokens dans requêtes protégées
- **Points clés**: `jwt.verify()`, `req.user`, headers Authorization

### 🗄️ PARTIE 2: API REST et Données

#### `TODO-MODEL-2` - Modèle Category
- **Fichier**: `backend/models/Category.js`
- **Section Lab**: "TODO-MODEL-2 : Modèle Category"
- **Objectif**: Schéma pour catégories de transactions
- **Points clés**: `enum`, `ref: 'User'`, validations

#### `TODO-MODEL-3` - Modèle Transaction
- **Fichier**: `backend/models/Transaction.js`
- **Section Lab**: "TODO-MODEL-3 : Modèle Transaction"
- **Objectif**: Schéma principal pour transactions financières
- **Points clés**: références, validations montant, types

#### `TODO-CRUD-1` - API Catégories
- **Fichier**: `backend/controllers/categoryController.js`
- **Section Lab**: "TODO-CRUD-1 : API complète des catégories"
- **Objectif**: Implémenter les 4 opérations CRUD
- **Points clés**: `GET`, `POST`, `PUT`, `DELETE`, sécurité utilisateur

#### `TODO-ROUTES-1` - Routes REST
- **Fichier**: `backend/routes/categories.js`
- **Section Lab**: "TODO-ROUTES-1 : Routes des catégories"
- **Objectif**: Connecter contrôleurs aux URLs
- **Points clés**: `router.route()`, middleware `protect`

#### `TODO-STATS-1` - Agrégation MongoDB
- **Fichier**: `backend/controllers/statsController.js`
- **Section Lab**: "TODO-STATS-1 : Statistiques avec agrégation"
- **Objectif**: Calculer statistiques avec pipeline MongoDB
- **Points clés**: `$match`, `$group`, `$lookup`, `$sort`

### ⚛️ PARTIE 3: Frontend React

#### `TODO-ROUTER-1` - Configuration Routing
- **Fichier**: `frontend/src/App.js`
- **Section Lab**: "TODO-ROUTER-1 : Configuration du routage"
- **Objectif**: Navigation et routes protégées
- **Points clés**: `BrowserRouter`, `PrivateRoute`, `Navigate`

#### `TODO-CONTEXT-1` - Context Auth
- **Fichier**: `frontend/src/contexts/AuthContext.js`
- **Section Lab**: "TODO-CONTEXT-1 : Configuration authentification"
- **Objectif**: État global de connexion
- **Points clés**: `useReducer`, `createContext`, `localStorage`

#### `TODO-COMPONENT-1` - Composant Navbar
- **Fichier**: `frontend/src/components/Navbar.js`
- **Section Lab**: "TODO-COMPONENT-1 : Premier composant React"
- **Objectif**: Barre de navigation avec Material-UI
- **Points clés**: `useAuth()`, affichage conditionnel

#### `TODO-FORM-1` - Formulaire Login
- **Fichier**: `frontend/src/components/auth/Login.js`
- **Section Lab**: "TODO-FORM-1 : Formulaire de connexion"
- **Objectif**: Interface de connexion utilisateur
- **Points clés**: `useState`, `handleSubmit`, validation

## 🚀 Ordre de Développement Recommandé

### Phase 1: Backend Core (30 min)
1. `TODO-SERVER-1` - Serveur Express
2. `TODO-DB-1` - Connexion MongoDB
3. `TODO-MODEL-1` - Modèle User

### Phase 2: Authentification (20 min)
4. `TODO-AUTH-1` - Génération JWT
5. `TODO-AUTH-2` - Middleware auth

### Phase 3: API Métier (40 min)
6. `TODO-MODEL-2` - Modèle Category
7. `TODO-MODEL-3` - Modèle Transaction
8. `TODO-CRUD-1` - Contrôleurs CRUD
9. `TODO-ROUTES-1` - Routes REST
10. `TODO-STATS-1` - Statistiques

### Phase 4: Frontend (45 min)
11. `TODO-CONTEXT-1` - Context Auth
12. `TODO-COMPONENT-1` - Navbar
13. `TODO-FORM-1` - Login Form
14. `TODO-ROUTER-1` - Routing complet

## ✅ Validation par Étape

### Après Phase 1-2 (Backend + Auth):
```bash
# Test avec curl ou Postman
POST http://localhost:5000/api/auth/register
POST http://localhost:5000/api/auth/login
GET  http://localhost:5000/api/health
```

### Après Phase 3 (API complète):
```bash
# Tester CRUD complet
GET    http://localhost:5000/api/categories
POST   http://localhost:5000/api/categories
PUT    http://localhost:5000/api/categories/:id
DELETE http://localhost:5000/api/categories/:id
```

### Après Phase 4 (Application complète):
- Interface web sur http://localhost:3000
- Inscription et connexion fonctionnelles
- Navigation entre pages
- Données en temps réel

## 🔍 Points d'Attention

### Erreurs Communes:
- **Oubli du middleware `protect`** sur routes privées
- **Variables d'environnement** non configurées
- **CORS** mal configuré pour frontend→backend
- **ObjectId** mal utilisé dans les références Mongoose

### Debugging:
- Vérifier les logs console pour les TODOs non complétés
- Tester chaque TODO individuellement
- Utiliser les health checks pour validation
- Consulter le lab PDF pour le code exact

## 📚 Correspondances Lab PDF

Chaque TODO fait référence à une section précise du lab:
- Les numéros correspondent (TODO-1 → Section 1)
- Le code complet est fourni dans chaque section
- Les explications théoriques précèdent chaque TODO
- Les checkpoints permettent de valider l'avancement

---

**🎓 Bon développement !**  
*Suivez le lab PDF étape par étape pour une progression optimale*
EOL

    print_success "README-TODOS.md généré"
}

# Fonction principale
main() {
    echo ""
    print_info "🎓 Génération du Code de Départ - Budget Tracker MERN"
    print_info "📚 Laboratoire Pratique Guidé - Dr. El Hadji Bassirou TOURE"
    print_info "🏫 DMI/FST/UCAD"
    echo ""
    
    print_info "Création de la structure complète du projet avec TODOs..."
    
    create_project_structure
    
    # Backend files
    print_info "📦 Génération des fichiers Backend..."
    generate_backend_package_json
    generate_server_js
    generate_database_config
    generate_user_model
    generate_category_model
    generate_transaction_model
    generate_jwt_utils
    generate_auth_middleware
    generate_category_controller
    generate_category_routes
    generate_stats_controller
    
    # Frontend files
    print_info "⚛️  Génération des fichiers Frontend..."
    generate_frontend_package_json
    generate_frontend_index
    generate_app_js
    generate_auth_context
    generate_navbar_component
    generate_login_component
    
    # Utility files
    print_info "🔧 Génération des fichiers de configuration..."
    generate_utils_files
    generate_docker_files
    generate_readme_todos
    
    # Final summary
    echo ""
    print_success "🎉 Code de départ généré avec succès !"
    echo ""
    print_info "📋 Résumé des fichiers générés :"
    echo ""
    echo -e "${PURPLE}Backend (Node.js/Express):${NC}"
    echo "  ✅ server.js avec TODO-SERVER-1"
    echo "  ✅ config/database.js avec TODO-DB-1"
    echo "  ✅ models/ avec TODO-MODEL-1,2,3"
    echo "  ✅ middleware/auth.js avec TODO-AUTH-2"
    echo "  ✅ controllers/ avec TODO-CRUD-1, TODO-STATS-1"
    echo "  ✅ routes/ avec TODO-ROUTES-1"
    echo "  ✅ utils/generateToken.js avec TODO-AUTH-1"
    echo ""
    echo -e "${PURPLE}Frontend (React):${NC}"
    echo "  ✅ App.js avec TODO-ROUTER-1"
    echo "  ✅ contexts/AuthContext.js avec TODO-CONTEXT-1"
    echo "  ✅ components/Navbar.js avec TODO-COMPONENT-1"
    echo "  ✅ components/auth/Login.js avec TODO-FORM-1"
    echo ""
    echo -e "${PURPLE}Configuration:${NC}"
    echo "  ✅ docker-compose.yml et Dockerfiles"
    echo "  ✅ package.json avec toutes les dépendances"
    echo "  ✅ .env avec variables d'environnement"
    echo "  ✅ README-TODOS.md avec guide complet"
    echo ""
    print_info "🎯 Prochaines étapes :"
    echo "1. 📖 Consultez README-TODOS.md pour la liste complète"
    echo "2. 📚 Ouvrez le lab PDF et suivez les sections TODO"
    echo "3. 🔧 Commencez par TODO-SERVER-1 dans backend/server.js"
    echo "4. ⚡ Lancez 'docker-compose up' pour tester"
    echo ""
    print_warning "📖 N'oubliez pas : chaque TODO référence une section précise du lab PDF !"
    print_success "Code de départ prêt pour le développement guidé 🚀"
}

# Lancer le script
main "$@"