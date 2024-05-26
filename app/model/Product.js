const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;
