const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert("./credencials.json"),
});

app.use(require("./routes/products.routes"));

exports.app = functions.https.onRequest(app);
