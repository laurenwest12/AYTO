const mongoose = require('mongoose');

const TruthBooth = mongoose.model('TruthBooth');
const Pair = mongoose.model('Pair');
const Cast = mongoose.model('Cast');

module.exports = (app) => {
  app.get('/api/truthbooths/:number', async (req, res) => {
    const truthbooth = await TruthBooth.findOne({ number: req.params.number });
    res.json(truthbooth);
  });

  // app.post('/api/truthbooths/', async (req, res) => {
  //   const { number, _pair1, _pair2 } = req.body;
  //   const match = _pair1.match === _pair2._id;
  //   const truthbooth = new TruthBooth({
  //     number,
  //     match,
  //     _pair1,
  //     _pair2,
  //   });

  //   await truthbooth.save();
  //   res.send(truthbooth);
  // });

  app.post('/api/truthbooths/:number/pairs', async (req, res) => {
    const { pair1, pair2, match } = req.body;

    const truthbooth = new TruthBooth({
      _pair1: await Cast.findOne({ _id: pair1._id }),
      _pair2: await Cast.findOne({ _id: pair2._id }),
      match,
      number: req.params.number,
    });

    await truthbooth.save();

    const pair = new Pair({
      _pair1: pair1._id,
      _pair2: pair2._id,
      match,
      _truthBooth: truthbooth._id,
    });

    await pair.save();

    res.send(truthbooth);
  });
};
