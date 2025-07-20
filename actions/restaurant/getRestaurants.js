/**
 * author Arya Permana - Kirin
 * created on 20-07-2025-14h-18m
 * github: https://github.com/KirinZero0
 * copyright 2025
*/

const admin = require('../../firebase');

const getRestaurants = async ({ userId }) => {
  const snapshot = await admin
    .firestore()
    .collection('restaurants')
    .where('userId', '==', userId)
    .get();

  const restaurants = snapshot.docs.map(doc => {
    const { userId, ...rest } = doc.data();
    return {
      id: doc.id,
      ...rest,
    };
  });

  return restaurants;
};

module.exports = { getRestaurants };
