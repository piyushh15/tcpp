const mongoose = require('mongoose');

const ImageDataSchema = new mongoose.Schema({
  UserData: { type: mongoose.Schema.Types.ObjectId, ref: 'UserData', required: true },
 
  Image: {
    data: Buffer,
    contentType: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  carPlateNumber: String,
});

const ImageData = mongoose.model('ImageData', ImageDataSchema);

module.exports = ImageData;

