const Validation = require("../validation/validationFactory");
const Movie = require("../model/movie");
const { Genre } = require("../model/genre");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.send(`<h1>${movies}</h1>`);
  res.end();
});

router.get("/:id", async (req, res) => {
  const movies = await Movie.find();
  const movieObject = new Validation(movies, req, res).createValidationType("movies");
  const movieExist = movieObject.checkIfDocumentExist();
  if (!movieExist) return;
  res.send(
    `<h1>Movie Title: ${movieExist.title} Movie Genre: 
    ${movieExist.genre.genreName} </h1>`
  );
  res.end();
});

router.post("/", async (req, res) => {
  const genreObject = new Validation(null, req, res).createValidationType("genres");
  const invalidData = genreObject.validateRequestedData();
  if (invalidData) return;
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre");
  let movie = new Movie({
    title: req.body.name,
    genre: {
      _id: genre._id,
      genreName: genre.genreName,
    },
    numberOfStock: req.body.numberOfStock,
    daliyRentalRate: req.body.daliyRentalRate,
  });
  movie = await movie.save();
  res.send(genre);
  res.end();
});

router.put("/:id", async (req, res) => {
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status("404").send("The specific movie does not exist");
  let updateMovie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.name,
      genre: {
        _id: genre._id,
        genreName: genre.genreName,
      },
      numberOfStock: req.body.numberOfStock,
      daliyRentalRate: req.body.daliyRentalRate,
    },
    { useFindAndModify: false }
  );
  res.send(updateMovie);
  res.end();
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id, {
    useFindAndModify: true,
  });
  if (!movie) return res.status(404).send("The movie with the given ID was not found.");
  res.send(movie);
});

module.exports = router;
