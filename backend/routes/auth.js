const express = require('express');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const router = express.Router();
require('dotenv').config();

// Inscription
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userDB = await User.findOne({ email: email });

        if (userDB) {
            return res.status(400).json({
                message: 'Cet utilisateur existe deja!',
                timestamp: new Date().toISOString()
            });
        }
        const user = await new User({ name, email, password });
        user.save();
        

        res.status(201).json({
            message: 'Utilisateur cree',
            user: {
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            },
            timestamp: new Date().toISOString()
        });
    }
    catch (e) {
        res.status(500).json({
            error: e.message,
            timestamp: new Date().toISOString()
        })
    }
});

// Connexion
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ message: 'Identifiants invalides!' });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Identifiants invalides!' });
        }

        const token = generateToken(user._id);

        res.json({
            message: 'Login reussi',
            token: token,
            user: {
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        })
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }
});

module.exports = router;
