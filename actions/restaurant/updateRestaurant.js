/**
 * author Arya Permana - Kirin
 * created on 20-07-2025-14h-24m
 * github: https://github.com/KirinZero0
 * copyright 2025
 */

const admin = require('../../firebase');
const { verifyUserOwnership } = require('../helpers/rules/ownershipRule');

const updateRestaurant = async ({ restaurantId, name, icon, imageUrl, descriptions, openAt, closeAt }) => {

    await verifyUserOwnership(req, 'restaurants', restaurantId);

    const updatedRestaurant = {
        name,
        icon,
        imageUrl,
        descriptions,
        openAt,
        closeAt
    };

    const restaureantRef = admin.firestore().collection('restaurants').doc(restaurantId);

    const doc = await restaureantRef.get();

    if (!doc.exists) {
        throw new Error('Restaurant not found');
    }

    await restaureantRef.update(updatedRestaurant);

    return { id: restaurantId, restaurant: updatedRestaurant };
};

module.exports = { updateRestaurant };