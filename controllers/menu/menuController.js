/**
 * author Arya Permana - Kirin
 * created on 20-07-2025-14h-49m
 * github: https://github.com/KirinZero0
 * copyright 2025
*/

const { deleteMenu } = require("../../actions/menu/deleteMenu");
const { getMenu } = require("../../actions/menu/getMenu");
const { getMenus, getActiveMenus } = require("../../actions/menu/getMenus");
const { storeMenu } = require("../../actions/menu/storeMenu");
const { updateMenu } = require("../../actions/menu/updateMenu");

const handleStoreMenu = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name, icon, descriptions } = req.body;

    const { id, menu } = await storeMenu({
      restaurantId, 
      name, 
      icon, 
      descriptions
    });

    res.status(201).json({
      message: 'Menu stored successfully',
      id,
      menu,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Menu store failed',
      error: err.message,
    });
  }
};

const handleUpdateMenu = async (req, res) => {
  try {
    const { menuId } = req.params;
    const { name, icon, descriptions, status } = req.body;

    const { id, menu } = await updateMenu({
      menuId,
      name,
      icon,
      descriptions,
      status
    });

    res.status(200).json({
      message: 'Menu updated successfully',
      id,
      menu,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Menu update failed',
      error: err.message,
    });
  }
};

const handleDeleteMenu = async (req, res) => {
  try {
    const { menuId } = req.params;

    const { message } = await deleteMenu({
      menuId,
    });

    res.status(200).json({
      message: message,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Menu delete failed',
      error: err.message,
    });
  }
};

const handleGetMenus = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const { menus } = await getMenus({
      restaurantId,
    });

    res.status(200).json({
      data: menus,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Menu Fetch failed',
      error: err.message,
    });
  }
};

const handleGetActiveMenus = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const { menus } = await getActiveMenus({
      restaurantId,
    });

    res.status(200).json({
      data: menus,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Menu Fetch failed',
      error: err.message,
    });
  }
};

const handleGetMenu = async (req, res) => {
  try {
    const { menuId } = req.params;

    const { menu } = await getMenu({
      menuId,
    });

    res.status(200).json({
      data: menu,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Menu Fetch failed',
      error: err.message,
    });
  }
};

module.exports = { handleStoreMenu, handleUpdateMenu, handleDeleteMenu, handleGetMenus, handleGetActiveMenus, handleGetMenu };