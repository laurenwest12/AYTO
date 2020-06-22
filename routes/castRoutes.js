const mongoose = require('mongoose');

const Cast = mongoose.model('cast');

module.exports = (app) => {
  app.get('/api/cast', (req, res) => {
    res.json(Cast);
  });

  app.post('/api/cast', async (req, res) => {
    const { name, imgUrl } = req.body;
    const cast = new Cast({
      name,
      imgUrl,
    });

    await cast.save();
    res.send(cast);
  });
};
