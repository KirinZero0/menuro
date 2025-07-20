/**
 * author Arya Permana - Kirin
 * created on 20-07-2025-15h-06m
 * github: https://github.com/KirinZero0
 * copyright 2025
*/

const express = require('express');
const admin = require('../firebase');
const verifyFirebaseToken = require('../middleware/verifyToken');
const { handleStoreMenu, handleUpdateMenu, handleDeleteMenu, handleGetActiveMenus, handleGetMenu, handleGetMenus } = require('../controllers/menu/menuController');

const router = express.Router();

// Public routes 
router.get('/restaurants/:restaurantId/menus', handleGetMenus);
router.get('/restaurants/:restaurantId/active-menus', handleGetActiveMenus);
router.get('/menu/:menuId', handleGetMenu);

// Restricted routes
router.post('/restaurants/:restaurantId/menu/store', verifyFirebaseToken, handleStoreMenu);

router.patch('/menu/:menuId/update', verifyFirebaseToken, handleUpdateMenu);
router.delete('/menu/:menuId/delete', verifyFirebaseToken, handleDeleteMenu);





module.exports = router;