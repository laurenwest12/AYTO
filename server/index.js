const express = require('express');
const app = express();
const path = require('path');
const syncAndSeed = require('./db/seed');
const { Cast } = require('./db/models/index');

const port = process.env.PORT || 3000;

app.get('/app.js', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'dist', 'main.js'))
);

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'index.html'))
);

app.get('/api/cast', (req, res, next) => {
  Cast.findAll()
    .then(cast => res.send(cast))
    .catch(next);
});

app.use(express.static(path.join(__dirname, '..', 'public')));

syncAndSeed().then(() =>
  app.listen(port, () => console.log(`listening on port ${port}`))
);
