/*
  Taken price converstion from -> https://stackoverflow.com/questions/13304129/how-should-i-store-a-price-in-mongoose/13305216#13305216
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// TODO: Add validation for repeat sku's
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
    min: 0,
    get: getPrice,
    set: setPrice
  },
  available: {
    type: Number,
    min: 0
  }
});

function getPrice(num) {
  num;
  return (num / 100).toFixed(2);
}

function setPrice(num) {
  return num * 100;
}

// Enable Mongoose getter functions
itemSchema.set("toObject", { getters: true });
itemSchema.set("toJSON", { getters: true });

module.exports = mongoose.model("Item", itemSchema);
