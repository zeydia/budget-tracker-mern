const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;
  // Extraire le token du header Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    
    try {
      token = req.headers.authorization.split(' ')[1];
      
      // Decoder le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Recuperer l ’ utilisateur et l ’attacher a la requete
      const user = await User.findById(decoded.id).select('-password');
      req.headers.authorization.split(' ')[1];
      req.user = user;
      next();
      //return res.json(user);

    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Token invalide' });
    }
  }
  if (!token) {
    return res.status(401).json({ message: 'Pas de token, acces refuse' });
  }
};

const userByToken = async (req, res) => {
  let token;
    try {
      token = req.body.token;
      
      // Decoder le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Recuperer l ’ utilisateur 
      const user = await User.findById(decoded.id).select('-password');
      
      return res.status(200).json({ message: 'Token correspondant', user: user});
 
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: 'Token invalide' });
    }

};

module.exports = { protect, userByToken };

