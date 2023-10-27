const express = require('express');
const app = express();
const port = 8000;

const feedRoutes = require('./feed/feed');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/feed', feedRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});