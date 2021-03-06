const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  firstName: String,
  lastName: String,
  address: {
    streetAddress: String,
    city: String,
    state: String,
    zip: Number
  },
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, "User phone number required"]
  }
});

// Enable Mongoose getter functions
CustomerSchema.set("toObject", { getters: true });
CustomerSchema.set("toJSON", { getters: true });

module.exports = mongoose.model("Customer", CustomerSchema);
