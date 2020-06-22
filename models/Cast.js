// const Sequelize = require('sequelize');
// const db = require('../db');

// const Cast = db.define('cast', {
//   name: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     validate: {
//       notEmpty: true
//     }
//   },
//   imgUrl: {
//     type: Sequelize.STRING,
//     defaultValue:
//       'http://mtv.mtvnimages.com/apps/series-art/are-you-the-one/Dr.Frankie.jpg?quality=0.85&width=548&height=548&crop=true'
//   }
// });

// module.exports = Cast;

const mongoose = require('mongoose');
const { Schema } = mongoose;

const Cast = newSchema({
  name: { type: String, required: true },
  imgUrl: {
    type: String,
    default:
      'http://mtv.mtvnimages.com/apps/series-art/are-you-the-one/Dr.Frankie.jpg?quality=0.85&width=548&height=548&crop=true',
  },
});

mongoose.model('cast', Cast);
