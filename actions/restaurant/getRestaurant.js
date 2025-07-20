/**
 * author Arya Permana - Kirin
 * created on 20-07-2025-14h-43m
 * github: https://github.com/KirinZero0
 * copyright 2025
*/

const admin = require('../../firebase');

const getRestaurant = async ({ restaurantId }) => {
  const restaurantRef = admin.firestore().collection('restaurants').doc(restaurantId);
  const doc = await restaurantRef.get();

  if (!doc.exists) {
    throw new Error('Restaurant not found');
  }

  const { userId, ...restaurantData } = doc.data();

  return {
    id: doc.id,
    ...restaurantData,
  };
};

module.exports = { getRestaurant };