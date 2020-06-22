const mongoose = require('mongoose');
const { Schema } = mongoose;

const Pair = new Schema({
  _pair1: { type: Schema.Types.ObjectId, ref: 'Cast' },
  _pair2: { type: Schema.Types.ObjectId, ref: 'Cast' },
  match: Boolean,
  _ceremony: { type: Schema.Types.ObjectId, ref: 'Ceremony' },
  _truthBooth: { type: Schema.Types.ObjectId, ref: 'Truth Booth' },
});

mongoose.model('Pair', Pair);
