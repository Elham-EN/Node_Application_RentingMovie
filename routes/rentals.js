const Validation = require("../validation/validationFactory");
const Rental = require("../models/rental");
const Movie = require("../models/movie");
const Customer = require("../models/customer");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const express = require("express");

const router = express.Router();

/**
 * If an error occurs on any of the steps, the database is returned to
 * its initial state (its state before the transaction started).
 */
Fawn.init(mongoose);

router.get("/", async (req, res) => {
  //Sorting by dateOut in decending order
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.post("/", async (req, res) => {
  const rentalObject = new Validation(null, req, res).createValidationType("rentals");
  const invalidData = rentalObject.validateRequestedData();
  if (invalidData) return res.status(400).send("The data is invalid");
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid customer.");
  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid movie.");
  if (movie.numberOfStock === 0) return res.status(400).send("Movie not in stock.");
  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  rental = await rental.save();
  //Then update numberInStock prop of movie and save it
  movie.numberOfStock--;
  /**
   * We have a problem, we have two separate operations, it is possible after we
   * save this rental something goes wrong or the server crashes or connection to
   * mongoDB drops. So second might not complete. That's where we need a transaction.
   * We can ensure that both these save() operations will update the state of our data
   * in the database or none of them will be applied. So they are atomic, they both
   * complete or they both roll back.
   */
  movie.save();
  //Create a task object which is like a transaction
  res.send(rental);
});
