const mongoose = require('mongoose');

const Cast = mongoose.model('Cast');
const Pair = mongoose.model('Pair');
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

  app.get('/api/ceremonies/:number/pairs', async (req, res) => {
    const ceremony = await Ceremony.find({ number: req.params.number });
    const pairs = ceremony._pairs;
    res.json(pairs);
  });

  app.post('/api/ceremonies/:number/pairs', async (req, res) => {
    const { _pair1, _pair2 } = req.body;
    let match;

    _pair1._match.id === _pair2.id ? (match = true) : (match = false);

    const pair = new Pair({
      _pair1: await Cast.findOne({ _id: _pair1._id }),
      _pair2: await Cast.findOne({ _id: _pair2._id }),
      match,
      _ceremony: await Ceremony.findOne({ number: req.params.number }),
    });
    pair.save();
    res.send(pair);
  });
};
