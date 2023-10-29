const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");

var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "thinc-humungousaur.appspot.com",
});

const db = getFirestore();

const storage = admin.storage();

module.exports = {
  db,
  storage,
};
