const admin = require('../firebase');

/**
 * Verifies the Firebase ID token from Authorization header
 * and checks if it matches the Firestore doc's userId,
 * unless the user has role === 'admin'
 * 
 * @param {Object} req - Express request object
 * @param {String} collection - Firestore collection name
 * @param {String} docId - Firestore document ID
 */
const verifyUserOwnership = async (req, collection, docId) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Unauthorized: Missing or invalid token');
  }

  const idToken = authHeader.split('Bearer ')[1];

  let decodedToken;
  try {
    decodedToken = await admin.auth().verifyIdToken(idToken);
  } catch (err) {
    throw new Error('Unauthorized: Invalid token');
  }

  const uid = decodedToken.uid;

  // Get the user's Firestore profile to check their role
  const userDoc = await admin.firestore().collection('users').doc(uid).get();
  const userData = userDoc.data();

  if (userData?.role === 'admin') {
    return uid; // bypass ownership check for admin
  }

  // Fetch the target document to check ownership
  const docRef = admin.firestore().collection(collection).doc(docId);
  const targetDoc = await docRef.get();

  if (!targetDoc.exists) {
    throw new Error('Document not found');
  }

  const data = targetDoc.data();
  if (data.userId !== uid) {
    throw new Error('Forbidden: You do not own this resource');
  }

  return uid;
};

module.exports = { verifyUserOwnership };
