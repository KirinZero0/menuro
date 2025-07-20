/**
 * author Arya Permana - Kirin
 * created on 20-07-2025-11h-48m
 * github: https://github.com/KirinZero0
 * copyright 2025
*/

const admin = require('firebase-admin');
const serviceAccount = require('./firebasekey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://<YOUR_PROJECT_ID>.firebaseio.com", // optional, for realtime db
});

module.exports = admin;