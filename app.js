const express = require("express");
const app = express();
const port = 8000;

const feedRoutes = require('./routes/feed');
const auth = require('./routes/auth');
const db = require('./database/db');

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get('/testDB',async (req, res) => {
    const result = await db.collection('user').get()
    console.log(result.docs.map(doc => doc.data()))
    res.send(1);
});

app.use('/feed', feedRoutes);

app.use('/auth', auth);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
