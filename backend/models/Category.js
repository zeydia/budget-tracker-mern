const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom de la categorie est requis'],
    unique: true,
  },
  type: {
    type: String,
    required: [true, 'Le type est requis'],
    enum: ['income', 'expense'],
    default: 'expense'
  },
  color: {
    type: String,
    required: [true,'La couleur est requise'],
    default: '#3498 db'
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref:'User',
    required: true
  }
}, { timestamps: true });

const Category = mongoose.model('Category', CategorySchema );

module.exports = { Category, CategorySchema };