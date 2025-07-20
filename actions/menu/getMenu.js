/**
 * author Arya Permana - Kirin
 * created on 20-07-2025-14h-43m
 * github: https://github.com/KirinZero0
 * copyright 2025
*/

const admin = require('../../firebase');

const getMenu = async ({ menuId }) => {
  const menuRef = admin.firestore().collection('menus').doc(menuId);
  const doc = await menuRef.get();

  if (!doc.exists) {
    throw new Error('Menu not found');
  }

  const { userId, ...menuData } = doc.data();

  return {
    id: doc.id,
    ...menuData,
  };
};

module.exports = { getMenu };