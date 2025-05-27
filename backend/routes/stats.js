const express = require('express');

const {
  getCategoryStats
} = require('../controllers/statsController');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Toutes les routes necessitent une authentification
router.use(protect);

// Routes REST classiques
router.route('/categories')
  .get(getCategoryStats) //GET /api/stats/categories

module.exports = router;