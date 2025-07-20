/**
 * author Arya Permana - Kirin
 * created on 20-07-2025-11h-49m
 * github: https://github.com/KirinZero0
 * copyright 2025
*/

const express = require('express');
const admin = require('../firebase');
const verifyFirebaseToken = require('../middleware/verifyToken');

const router = express.Router();

router.get('/me', verifyFirebaseToken, (req, res) => {
  res.send({ message: 'Hello, authenticated user!', uid: req.user.uid });
});

router.get('/', (req, res) => {
  res.send({ message: 'User route works!' });
});

module.exports = router;