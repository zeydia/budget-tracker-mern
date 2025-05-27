const express = require('express');

const {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require('../controllers/transactionController');
const { protect } = require('../middleware/auth');
const router = express.Router();

// Toutes les routes necessitent une authentification
router.use(protect);

// Routes REST classiques
router.route('/')
  .get(getTransactions) //GET /api/transactions
  .post(createTransaction); // POST /api/transactions

router.route('/:id')
  .put(updateTransaction) // PUT /api/transactions/:id
  .delete(deleteTransaction); // DELETE /api/transactions/:id
  
module.exports = router;