const mongoose = require('mongoose');
const { Schema } = mongoose;

const TruthBooth = new Schema({
  number: { type: Number, min: 1, max: 10 },
  match: Boolean,
  _pair1: { type: Schema.Types.ObjectId, ref: 'Cast' },
  _pair2: { type: Schema.Types.ObjectId, ref: 'Cast' },
});

mongoose.model('TruthBooth', TruthBooth);
