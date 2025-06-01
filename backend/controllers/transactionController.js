const Transaction = require('../models/Transaction');

// GET /api/transactions - Lister toutes les transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id });
    res.json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/transactions - Creer une nouvelle transaction
const createTransaction = async (req, res) => {
  try {
    const { description, amount, type, category, date } = req.body;
    const transaction = await Transaction.create({
      description, amount, type, category, user: req.user._id, date
    });
    res.status(201).json({ success: true, data: transaction });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT /api/transactions/:id - Modifier une transaction
const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!transaction) {
      return res.status(404).json({ success: false, message:'Transaction non trouvee'});
    }
    res.json({ success: true, data: transaction });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/transactions/:id - Supprimer une transaction
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id, user: req.user._id
    });
    if (!transaction) {
      return res.status(404).json({ success: false, message:'Transaction non trouvee'});
    }
    return res.json({ success: true, message:'Transaction supprimee'});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getTransactions, createTransaction, updateTransaction, deleteTransaction };