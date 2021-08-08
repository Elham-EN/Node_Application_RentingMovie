const mogoonse = require("mongoose");

const rentalSchema = new mogoonse.Schema({
  customer: {
    type: new mogoonse.Schema({
      name: {
        type: String,
        required: true,
        minlength: 5,
      },
      isGold: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: String,
        required: true,
        minlength: 11,
      },
    }),
  },
  movie: {
    type: new mogoonse.Schema({
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    }),
    dailyRentalTate: {
      type: Number,
      required: true,
      min: 0,
      max: 255,
    },
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

const Rental = mogoonse.model("Rental", rentalSchema);

module.exports = Rental;
