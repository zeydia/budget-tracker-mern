const mongoose = require('mongoose');
const {CategorySchema} = require('../models/Category');

const TransactionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true,'La description est requise'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true,'Le montant est requis'],
    min: [0,' Le montant doit etre positif']
  },
  type: {
    type: String,
    required: [true,'Le type est requis'],
    enum: ['income','expense']
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref:'Category',
    required: [true,'La categorie est requise']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref:'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);