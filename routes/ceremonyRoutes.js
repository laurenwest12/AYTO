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

  //update the number of beams for a ceremony
  app.put('/api/ceremonies/:number', async (req, res) => {
    const ceremony = await Ceremony.findOne({ number: req.params.number });
    const pairs = await Pair.find({ _ceremony: ceremony._id });
    const beams = pairs.filter(({ match }) => match).length;
    await Ceremony.updateOne({ number: req.params.number }, { beams });
    res.send(ceremony);
  });

  app.get('/api/ceremonies/:number/pairs', async (req, res) => {
    const ceremony = await Ceremony.findOne({ number: req.params.number });
    const pairs = await Pair.find({ _id: ceremony._pairs });
    res.json(pairs);
  });

  app.post('/api/ceremonies/:number/pairs', async (req, res) => {
    const { pair1, pair2 } = req.body;
    let match;

    pair1._match === pair2._id ? (match = true) : (match = false);

    const pair = new Pair({
      _pair1: await Cast.findOne({ _id: pair1._id }),
      _pair2: await Cast.findOne({ _id: pair2._id }),
      match,
      _ceremony: await Ceremony.findOne({ number: req.params.number }),
    });

    pair.save();

    await Ceremony.updateOne(
      { number: req.params.number },
      { $push: { _pairs: pair._id } }
    );

    res.send(pair);
  });
};
