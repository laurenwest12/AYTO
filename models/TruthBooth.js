const mongoose = require('mongoose');
const { Schema } = mongoose;

const TruthBooth = new Schema({
  match: Boolean,
  _pair1: { type: Schema.Types.ObjectId, ref: 'Cast' },
  _pair2: { type: Schema.Types.ObjectId, ref: 'Cast' },
});

mongoose.model('TruthBooth', TruthBooth);
