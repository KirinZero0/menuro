// controllers/userController.js
const { loginUser } = require('../../actions/auth/login');
const { registerUser } = require('../../actions/auth/register');

const handleRegister = async (req, res) => {
  try {
    const { email, password, name, restaurantName, photoURL, subscriptionPlan } = req.body;

    const { user, token } = await registerUser({
      email,
      password,
      name,
      restaurantName,
      photoURL,
      subscriptionPlan,
    });

    res.status(201).json({
      message: 'User registered successfully',
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Registration failed',
      error: err.message,
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser({
      email,
      password,
    });

    res.status(201).json({
      message: 'User logged in successfully',
      user,
      token,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Login failed',
      error: err.message,
    });
  }
};

module.exports = { handleRegister, handleLogin };