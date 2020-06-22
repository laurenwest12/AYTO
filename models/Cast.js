const mongoose = require('mongoose');
const { Schema } = mongoose;

const Cast = new Schema({
  name: { type: String },
  imgUrl: {
    type: String,
    default:
      'http://mtv.mtvnimages.com/apps/series-art/are-you-the-one/Dr.Frankie.jpg?quality=0.85&width=548&height=548&crop=true',
  },
  _match: { type: Schema.Types.ObjectId, ref: 'cast', default: null },
});

mongoose.model('cast', Cast);
