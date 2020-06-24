const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const keys = require('../config/dev');
const { mongoURI } = keys('<dbname>');

require('../models/Cast');
require('../models/Ceremony');
require('../models/Pair');
require('../models/TruthBooth');

const PORT = process.env.PORT || 3000;

mongoose.connect(mongoURI, { useNewUrlParser: true });

app.use(bodyParser.json());

require('../routes/castRoutes')(app);
require('../routes/ceremonyRoutes')(app);
require('../routes/truthBoothRoutes')(app);

app.get('/app.js', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'dist', 'main.js'))
);

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'index.html'))
);

app.use(express.static(path.join(__dirname, '..', 'public')));

app.listen(PORT);
