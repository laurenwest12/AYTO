const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const keys = require('../config/dev');

require('../models/Cast');

const PORT = process.env.PORT || 3000;

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

app.use(bodyParser.json());

require('../routes/castRoutes')(app);

app.get('/app.js', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'dist', 'main.js'))
);

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'index.html'))
);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(PORT);
