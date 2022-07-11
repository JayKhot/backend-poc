const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectToMongo = require('./db');

require('dotenv').config()
const PORT = process.env.PORT || 3000;

connectToMongo();

app.use(bodyParser.json());
app.use('/auth', require('./Routes/auth'));

app.listen(PORT, () => {
    console.log(`POC app listening on port ${PORT}`)
})
