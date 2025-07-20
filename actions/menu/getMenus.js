/**
 * author Arya Permana - Kirin
 * created on 20-07-2025-14h-18m
 * github: https://github.com/KirinZero0
 * copyright 2025
*/

const admin = require('../../firebase');

const getMenus = async ({ restaurantId }) => {
  const snapshot = await admin
    .firestore()
    .collection('menus')
    .where('restaurantId', '==', restaurantId)
    .get();

  const menus = snapshot.docs.map(doc => {
    const { userId, ...rest } = doc.data();
    return {
      id: doc.id,
      ...rest,
    };
  });

  return menus;
};

const getActiveMenus = async ({ restaurantId }) => {
  const snapshot = await admin
    .firestore()
    .collection('menus')
    .where('restaurantId', '==', restaurantId)
    .where('status', '==', true)
    .get();

  const menus = snapshot.docs.map(doc => {
    const { userId, ...rest } = doc.data();
    return {
      id: doc.id,
      ...rest,
    };
  });

  return menus;
};

module.exports = { getMenus, getActiveMenus };
