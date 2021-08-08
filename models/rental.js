const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true,
        //minlength: 5,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: String,
        required: true,
        //minlength: 11,
      },
    }),
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },
  //In the future when customer returns the movie and set the value
  dateReturned: {
    //Set in the server
    type: Date,
  },
  rentalFee: {
    //Set in the server
    type: Number,
    min: 0,
  },
});

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;
