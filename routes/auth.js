/**
 * author Arya Permana - Kirin
 * created on 20-07-2025-12h-52m
 * github: https://github.com/KirinZero0
 * copyright 2025
*/
const express = require('express');
const router = express.Router();
const { handleRegister, handleLogin } = require('../controllers/auth/authController');

router.post('/register', handleRegister);
router.post('/login', handleLogin);

module.exports = router;