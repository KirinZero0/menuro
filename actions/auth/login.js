/**
 * author Arya Permana - Kirin
 * created on 20-07-2025-12h-01m
 * github: https://github.com/KirinZero0
 * copyright 2025
*/

const admin = require('firebase-admin');
const axios = require('axios');

const loginUser = async ({ email, password }) => {

  const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
  const FIREBASE_AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_API_KEY}`;

  const { data } = await axios.post(FIREBASE_AUTH_URL, {
    email,
    password,
    returnSecureToken: true,
  });

  const uid = data.localId;

  const customToken = await admin.auth().createCustomToken(uid);

  const userSnapshot = await admin.firestore().collection('users').doc(uid).get();
  const userData = userSnapshot.data();

  return {
    token: customToken,
    user: userData,
  };
};

module.exports = { loginUser };