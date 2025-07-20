const admin = require('../../firebase');
const { getAuth } = require('firebase-admin/auth');

const registerUser = async ({ email, password, name, photoURL, subscriptionPlan }) => {
  const userRecord = await getAuth().createUser({
    email,
    password,
    displayName: name,
  });

  const uid = userRecord.uid;

  const newUser = {
    uid,
    name,
    email,
    role: 'user',
    photoURL: photoURL || '',
    subscriptionPlan: subscriptionPlan || 'free',
    lastLogin: admin.firestore.Timestamp.now(),
    createdAt: admin.firestore.Timestamp.now(),
  };

  const userRef = admin.firestore().collection('users').doc(uid);
  await userRef.set(newUser);

  const customToken = await getAuth().createCustomToken(uid);

  return { user: newUser, token: customToken };
};

module.exports = { registerUser };
