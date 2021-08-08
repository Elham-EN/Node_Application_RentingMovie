const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const movieSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true, minlength: 3 },
  genre: { type: genreSchema, required: true },
  numberOfStock: { type: Number, required: true, min: 1 },
  daliyRentalRate: { type: Number, required: true, min: 1 },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
