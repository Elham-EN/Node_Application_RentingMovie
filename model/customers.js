const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  isGold: { type: Boolean, required: true, default: false },
  name: { type: String, required: true, minlength: 4, maxlength: 25 },
  phone: { type: String, required: true, minlength: 10 },
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
