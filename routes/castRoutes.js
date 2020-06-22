const mongoose = require('mongoose');

const Cast = mongoose.model('Cast');

module.exports = (app) => {
  app.get('/api/cast', async (req, res) => {
    const cast = await Cast.find();
    res.json(cast);
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

  app.put('/api/cast/:id', async (req, res) => {
    const cast = await Cast.updateOne({ _id: req.body._id }, req.body);
    res.send(cast);
  });

  app.put('/api/cast', async (req, res) => {
    const cast = await req.body.map(async (member) => {
      await Cast.updateOne({ _id: member._id }, member);
    });
    res.send(cast);
  });
};
