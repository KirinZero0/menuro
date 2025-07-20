/**
 * author Arya Permana - Kirin
 * created on 20-07-2025-15h-33m
 * github: https://github.com/KirinZero0
 * copyright 2025
*/

const express = require('express');
const admin = require('../firebase');
const verifyFirebaseToken = require('../middleware/verifyToken');
const { handleStoreRestaurant, handleGetRestaurants, handleUpdateRestaurant, handleDeleteRestaurant } = require('../controllers/restaurant/restaurantController');

const router = express.Router();

// Public routes 
router.get('/restaurants/:restaurantId', handleGetRestaurants);


//Resticted routes
router.get('/user-restaurants', verifyFirebaseToken, handleGetRestaurants);
router.post('/restaurants/store', verifyFirebaseToken, handleStoreRestaurant);
router.patch('/restaurants/:restaurantId/update', verifyFirebaseToken, handleUpdateRestaurant);
router.delete('/restaurants/:restaurantId/delete', verifyFirebaseToken, handleDeleteRestaurant);



module.exports = router;