const express = require('express');
const app = express();
const port = 8000;
const cors = require('cors');

const feedRoutes = require('./routes/feed');
const auth = require('./routes/auth');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/feed', feedRoutes);

app.use('/auth', auth);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});