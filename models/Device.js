const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const deviceSchema = mongoose.Schema({
  dNumber: { type: Number },
  dId: {type: String},
  dIp: {type: String},
  dPassword:{type: String},
  coordinates: {
    lat: Number,
    lng: Number
  }
});

deviceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Device', deviceSchema);