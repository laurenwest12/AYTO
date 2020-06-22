const mongoose = require('mongoose');
const { Schema } = mongoose;

const Pair = new Schema({
  _pair1: { type: Schema.Types.ObjectId, ref: 'Cast' },
  _pair2: { type: Schema.Types.ObjectId, ref: 'Cast' },
  match: Boolean,
});

mongoose.model('pair', Pair);
