/**
 * author Arya Permana - Kirin
 * created on 20-07-2025-15h-31m
 * github: https://github.com/KirinZero0
 * copyright 2025
*/

const { deleteRestaurant } = require("../../actions/restaurant/deleteRestaurant");
const { getRestaurant } = require("../../actions/restaurant/getRestaurant");
const { getRestaurants } = require("../../actions/restaurant/getRestaurants");
const { storeRestaurant } = require("../../actions/restaurant/storeRestaurant");
const { updateRestaurant } = require("../../actions/restaurant/updateRestaurant");



const handleStoreRestaurant = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { name, icon, imageUrl, descriptions, openAt, closeAt } = req.body;

    const { id, menu } = await storeRestaurant({
      userId, 
      name, 
      icon,
      imageUrl, 
      descriptions,
      openAt, 
      closeAt
    });

    res.status(201).json({
      message: 'Restaurant stored successfully',
      id,
      menu,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Restaurant store failed',
      error: err.message,
    });
  }
};

const handleUpdateRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const { name, icon, imageUrl, descriptions, openAt, closeAt } = req.body;

    const { id, menu } = await updateRestaurant({
      restaurantId,
      name,
      icon,
      imageUrl,
      descriptions,
      openAt,
      closeAt
    });

    res.status(200).json({
      message: 'Resrtaurant updated successfully',
      id,
      menu,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Restaurant update failed',
      error: err.message,
    });
  }
};

const handleDeleteRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const { message } = await deleteRestaurant({
      restaurantId,
    });

    res.status(200).json({
      message: message,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Restaurant delete failed',
      error: err.message,
    });
  }
};

const handleGetRestaurants = async (req, res) => {
  try {
    const userId = req.user.uid;

    const { restaurants } = await getRestaurants({
      userId,
    });

    res.status(200).json({
      data: restaurants,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Restaurant Fetch failed',
      error: err.message,
    });
  }
};

const handleGetRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const { restaurant } = await getRestaurant({
      restaurantId,
    });

    res.status(200).json({
      data: restaurant,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Restaurant Fetch failed',
      error: err.message,
    });
  }
};

module.exports = { handleStoreRestaurant, handleUpdateRestaurant, handleDeleteRestaurant, handleGetRestaurants, handleGetRestaurant };