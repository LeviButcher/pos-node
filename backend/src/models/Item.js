/*
  Taken price converstion from -> https://stackoverflow.com/questions/13304129/how-should-i-store-a-price-in-mongoose/13305216#13305216
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  sku: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  picUrl: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    min: 0
  },
  available: {
    type: Number,
    min: 0
  }
});

// Getter
itemSchema.path("price").get(function(num) {
  return (num / 100).toFixed(2);
});

// Setter
itemSchema.path("price").set(function(num) {
  return num * 100;
});

module.exports = mongoose.model("Item", itemSchema);
