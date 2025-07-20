/**
 * author Arya Permana - Kirin
 * created on 20-07-2025-14h-18m
 * github: https://github.com/KirinZero0
 * copyright 2025
*/

const admin = require('../../firebase');
const { verifyUserOwnership } = require('../helpers/rules/ownershipRule');

const storeMenu = async ({ restaurantId, name, icon, descriptions }) => {
    const restaurantDoc = await admin.firestore().collection('restaurants').doc(restaurantId).get();

    if (!restaurantDoc.exists) {
        throw new Error('Restaurant not found');
    }

    const restaurantData = restaurantDoc.data();
    const userId = restaurantData.userId;

    await verifyUserOwnership(req, 'restaurants', restaurantId);

    const newMenu = {
        restaurantId,
        userId,
        name,
        icon,
        descriptions: descriptions || '',
        status: true,
        createdAt: admin.firestore.Timestamp.now(),
    };

    const menu = await admin.firestore().collection('menus').add(newMenu);

    return { id: menu.id, menu: menu };
};

module.exports = { storeMenu };
