const Category = require('../models/Category');

// GET /api/categories - Lister toutes les categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user._id });
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/categories - Creer une nouvelle categorie
const createCategory = async (req, res) => {
  try {
    const { name, type, color } = req.body;
    const category = await Category.create({
      name, type, color, user: req.user._id
    });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT /api/categories/:id - Modifier une categorie
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ success: false, message:'Categorie non trouvee'});
    }
    res.json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/categories/:id - Supprimer une categorie
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id, user: req.user._id
    });
    if (!category) {
      return res.status(404).json({ success: false, message:'Categorie non trouvee'});
    }
    res.json({ success: true, message:'Categorie supprimee'});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };