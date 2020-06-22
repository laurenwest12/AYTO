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

  // app.post('/api/cast', async (req, res) => {
  //   const { name, imgUrl } = req.body;
  //   const cast = new Cast({
  //     name,
  //     imgUrl,
  //   });

  //   await cast.save();
  //   res.send(cast);
  // });

  // app.put('/api/cast/:id', async (req, res) => {
  //   const cast = await Cast.updateOne({ _id: req.body._id }, req.body);
  //   res.send(cast);
  // });

  // app.put('/api/cast', async (req, res) => {
  //   const cast = await req.body.map(async (member) => {
  //     await Cast.updateOne({ _id: member._id }, member);
  //   });
  //   res.send(cast);
  // });
};
