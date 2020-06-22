const mongoose = require('mongoose');
const { Schema } = mongoose;

const Ceremony = new Schema({
  number: { type: Number, default: 1, min: 1, max: 10 },
  beams: { type: Number, default: null, min: 0, max: 10 },
  _pairs: [{ type: Schema.Types.ObjectId, ref: 'Pair' }],
});

mongoose.model('ceremony', Ceremony);
