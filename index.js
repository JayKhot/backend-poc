const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connectToMongo = require('./db');
const config = require('dotenv').config()
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

connectToMongo();

app.listen(PORT, () => {
    console.log(`POC app listening on port ${PORT}`)
})
