
const mongoose = require('mongoose');

const classifiedSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  image: String,
  location: String,
  postedAt: Date,
  price: String,
});

module.exports = mongoose.model('Classified', classifiedSchema);
