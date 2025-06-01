const express = require('express');

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Toutes les routes necessitent une authentification
router.use(protect);

// Routes REST classiques
router.route('/')
  .get(getUsers) //GET /api/transactions
  .post(createUser); // POST /api/transactions

router.route('/:id')
  .get(getUserById) // GET /api/users/:id
  .put(updateUser) // PUT /api/transactions/:id
  .delete(deleteUser); // DELETE /api/transactions/:id
  
module.exports = router;