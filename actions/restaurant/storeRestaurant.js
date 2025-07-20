/**
 * author Arya Permana - Kirin
 * created on 20-07-2025-14h-18m
 * github: https://github.com/KirinZero0
 * copyright 2025
*/

const admin = require('../../firebase');

const storeRestaurant = async ({ userId, name, icon, imageUrl, descriptions, openAt, closeAt }) => {
    const newRestaurant = {
        userId,
        name,
        icon,
        imageUrl: imageUrl || '',
        descriptions: descriptions || '',
        status: true,
        openAt,
        closeAt,
        createdAt: admin.firestore.Timestamp.now(),
    };

    const restaurant = await admin.firestore().collection('restaurants').add(newRestaurant);

    return { id: restaurant.id, restaurant: restaurant };
};

module.exports = { storeRestaurant };
