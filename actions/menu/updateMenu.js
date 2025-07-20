/**
 * author Arya Permana - Kirin
 * created on 20-07-2025-14h-24m
 * github: https://github.com/KirinZero0
 * copyright 2025
 */

const admin = require('../../firebase');

const updateMenu = async ({ menuId, name, icon, descriptions, status }) => {

    await verifyUserOwnership(req, 'menus', menuId);

    const updatedMenu = {
        name,
        icon,
        descriptions,
        status
    };

    const menuRef = admin.firestore().collection('menus').doc(menuId);

    const doc = await menuRef.get();

    if (!doc.exists) {
        throw new Error('Menu not found');
    }

    await menuRef.update(updatedMenu);

    return { id: menuId, menu: updatedMenu };
};

module.exports = { updateMenu };