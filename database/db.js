const { getFirestore } = require('firebase-admin/firestore');


var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = getFirestore();

module.exports = db;