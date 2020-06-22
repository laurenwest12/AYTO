const mongoose = require('mongoose');

const Ceremony = mongoose.model('Ceremony');

module.exports = (app) => {
  app.get('/api/ceremonies', async (req, res) => {
    const ceremony = await Ceremony.find();
    res.json(ceremony);
  });

  app.get('/api/ceremonies/:number', async (req, res) => {
    const ceremony = await Ceremony.findOne({ number: req.params.number });
    res.json(ceremony);
  });

  app.post('/api/ceremonies', async (req, res) => {
    const { number, beams, _pairs } = req.body;
    const ceremony = new Ceremony({
      number,
      beams,
      _pairs,
    });
    await ceremony.save();
    res.send(ceremony);
  });

  app.put('/api/ceremonies/:number', async (req, res) => {
    const ceremony = await Ceremony.updateOne(
      { number: req.params.number },
      req.body
    );
    res.send(ceremony);
  });
};
