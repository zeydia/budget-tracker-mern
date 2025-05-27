const express = require('express');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const router = express.Router();
require('dotenv').config();

// Inscription
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    console.log('register...');
    try {
        const Userdb = await User.findOne({ email: email });
        if (Userdb) {
            return res.status(400).json({
                message: 'Cet utilisateur existe deja!',
                timestamp: new Date().toISOString()
            });
        }
        const user = await new User({ name, email, password });
        user.save();
        res.status(201).json({
            message: 'Utilisateur cree',
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
            token: token
        })
    }
    catch (e) {
        res.status(500).json({ error: e.message })
    }
});

// Trouve tous les utilisateurs
router.get('/users', async (req, res) => {

    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {

        console.log(error.message);
    }

});

// Trouve un utilisateurs par son email
router.get('/user', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email: email });
        res.json(user);
    } catch (error) {

        console.log(error.message);
    }

});

// Trouve un utilisateur par son id
router.get('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOne({ id: id });
        res.json(user);
    } catch (error) {

        console.log(error.message);
    }

});

module.exports = router;






