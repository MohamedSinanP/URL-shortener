const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortCode: { type: String, required: true },
  createdAt: { type: Date, required: true }
});

const ShortURL = mongoose.model('ShortURL', urlSchema);

module.exports = ShortURL;