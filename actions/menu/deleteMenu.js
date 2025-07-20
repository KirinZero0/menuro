/**
 * author Arya Permana - Kirin
 * created on 20-07-2025-14h-29m
 * github: https://github.com/KirinZero0
 * copyright 2025
*/

const admin = require('../../firebase');
const { verifyUserOwnership } = require('../helpers/rules/ownershipRule');

const deleteMenu = async ({ menuId }) => {

    await verifyUserOwnership(req, 'menus', menuId);

  const menuRef = admin.firestore().collection('menus').doc(menuId);

  const doc = await menuRef.get();

  if (!doc.exists) {
    throw new Error('Menu not found');
  }

  await menuRef.delete();

  return { message: 'Menu deleted successfully' };
};

module.exports = { deleteMenu };