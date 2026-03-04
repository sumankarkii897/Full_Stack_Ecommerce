const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  image: {
    type: String,
    // required : true,
  },

  name: {
    type: String,
    required: true,
    trim : true,
  },
  description: {
    type: String,
  },
  productCode: {
    type: String,
    required: true,
    trim : true,
  },
  price: {
    type: Number,
    required: true,
  },
  oldPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
