const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('../config/passport');

// Middleware function for protected routes
const authenticateJWT = passport.authenticate('jwt', { session: false });

// Get user profile
router.get('/profile', authenticateJWT, userController.getUserProfile);

// Get products purchased by the logged-in user
router.get('/my-products', authenticateJWT, userController.getUserProducts);

module.exports = router;
