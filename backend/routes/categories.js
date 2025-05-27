const express = require('express');

const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Toutes les routes necessitent une authentification
router.use(protect);

// Routes REST classiques
router.route('/')
  .get(getCategories) //GET /api/categories
  .post(createCategory); // POST /api/categories

router.route('/:id')
  .put(updateCategory) // PUT /api/categories/:id
  .delete(deleteCategory); // DELETE /api/categories/:id
  
module.exports = router;