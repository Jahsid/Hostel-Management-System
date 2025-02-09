const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { login, changePassword, verifySession, register } = require('../controllers/authController');

// @route   POST api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty()
], login);

// @route   POST api/auth/change-password
// @desc    Change password
// @access  Private
router.post('/change-password', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Old password is required').isLength({ min: 8 }),
    check('newPassword', 'New password of more than 8 character is required').isLength({ min: 8 })
], changePassword);

// @route   POST api/auth/verifysession
// @desc    Verify session
// @access  public
router.post('/verifysession', [
    check('token', 'Token is required').not().isEmpty()
], verifySession);

// @route   POST api/auth/register
// @desc    Create user
// @access  Public
router.post('/register', [
    check('email', 'Please include a valid email').isEmail(),
    check("password", "Password must be at least 8 characters").isLength({ min: 8 }),
], register);

module.exports = router;
