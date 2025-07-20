/**
 * author Arya Permana - Kirin
 * created on 20-07-2025-14h-29m
 * github: https://github.com/KirinZero0
 * copyright 2025
*/

const admin = require('../../firebase');
const { verifyUserOwnership } = require('../helpers/rules/ownershipRule');

const deleteRestaurant = async (req, { restaurantId }) => {

  await verifyUserOwnership(req, 'restaurants', restaurantId);

  const restaurantRef = admin.firestore().collection('restaurants').doc(restaurantId);
  const doc = await restaurantRef.get();

  if (!doc.exists) {
    throw new Error('Restaurant not found');
  }

  const menusSnapshot = await admin.firestore()
    .collection('menus')
    .where('restaurantId', '==', restaurantId)
    .get();

  const batch = admin.firestore().batch();

  menusSnapshot.forEach((menuDoc) => {
    batch.delete(menuDoc.ref);
  });

  batch.delete(restaurantRef);

  await batch.commit();

  return { message: 'Restaurant and its menus deleted successfully' };
};

module.exports = { deleteRestaurant };
