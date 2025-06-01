const express = require(`express`);
const cors = require(`cors`);
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const categoriesRoutes = require('./routes/categories');
const transactionsRoutes = require('./routes/transactions');
const statsRoutes = require('./routes/stats');
const usersRoutes = require('./routes/usersRoutes');
const { userByToken } = require('./middleware/auth');

const app = express();

// Connexion a la db
connectDB();

// Middleware pour parser le JSON
app.use(express.json());

// Permettre les requetes cross - origin ( frontend vers backend )
app.use(cors());

// Routes publiques
app.use('/api/auth', authRoutes);

// Route de test
app.get('/api/health' , (req, res) => {
  res.json({
    message: `API Budget Tracker fonctionne !`,
    timestamp: new Date().toISOString()
  });
});

// Route Utilisateurs
app.use('/api/users', usersRoutes);

// Route Chargement de l'utilisateur
app.use('/api/userByToken', userByToken);

// Route Categories
app.use('/api/categories', categoriesRoutes);

// Route Transactions
app.use('/api/transactions', transactionsRoutes);

// Route Stats
app.use('/api/stats', statsRoutes);

// Demarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur demarre sur le port ${ PORT }`);
});