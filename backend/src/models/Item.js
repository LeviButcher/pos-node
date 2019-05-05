/*
  Taken price converstion from -> https://stackoverflow.com/questions/13304129/how-should-i-store-a-price-in-mongoose/13305216#13305216
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { centsToDecimal, decimalToCents } = require("../util/CentConvertor");

// TODO: Add validation for repeat sku's
const ItemSchema = new Schema({
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
    get: centsToDecimal,
    set: decimalToCents,
    required: true
  },
  available: {
    type: Number,
    min: 0,
    required: true
  }
});

// Enable Mongoose getter functions
ItemSchema.set("toObject", { getters: true });
ItemSchema.set("toJSON", { getters: true });

module.exports = mongoose.model("Item", ItemSchema);
