const User = require('../models/User');

// GET /api/users  -  Recuperer tous les utilisateurs
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}


// GET /api/users/:id  -  Recuperer un utilisateur par son id
const getUserById = async (req, res) => {
    try {
        const users = await User.find({ _id: req.params.id }).select('-password');
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// POST /api/users - Creer un mouveau utilisateur
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name, email, password
    });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT /api/users/:id - Modifier une transaction
const updateUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ success: false, message:'Utilisateur non trouvee'});
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/transactions/:id - Supprimer une transaction
const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      _id: req.params.id, user: req.user._id
    });
    if (!user) {
      return res.status(404).json({ success: false, message:'Utilisateur non trouve'});
    }
    res.json({ success: true, message:'Utilisateur supprimé'});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser }