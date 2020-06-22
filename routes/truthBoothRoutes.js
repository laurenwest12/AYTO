const mongoose = require('mongoose');

const TruthBooth = mongoose.model('TruthBooth');
const Pair = mongoose.model('Pair');
const Cast = mongoose.model('Cast');

module.exports = (app) => {
  app.get('/api/truthbooths/:number', async (req, res) => {
    const truthbooth = TruthBooth.findOne({ number: req.params.number });
    res.json(truthbooth);
  });

  app.post('/api/truthbooth/:number/pairs', async (req, res) => {
    const { _pair1, _pair2, match } = req.body;

    const truthbooth = new TruthBooth({
      _pair1: await Cast.findOne({ _id: _pair1._id }),
      _pair2: await Cast.findOne({ _id: _pair2._id }),
      match,
      number: req.params.number,
    });

    await truthbooth.save();
    res.send(truthbooth);
  });
};
