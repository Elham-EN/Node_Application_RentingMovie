const Validation = require("../validation/validationFactory");
const { Genre } = require("../models/genre");
const express = require("express");
const router = express.Router();

//Fetch collection of genres
router.get("/", async (req, res) => {
  const genres = await Genre.find();
  console.log(genres);
  res.send(`<h1> ${genres} </h1>`);
  res.end();
});

//Fetch single genre
router.get("/:id", async (req, res) => {
  const genres = await Genre.find();
  const genre = new Validation(genres, req, res).createValidationType("genres");
  const genreExist = genre.checkIfDocumentExist();
  if (!genreExist) return;
  res.send(`<h1> Genre ID: ${genreExist._id} Genre Name: ${genreExist.genreName}</h1>`);
  res.end();
});

//Create a new Genre
router.post("/", async (req, res) => {
  const genreObject = new Validation(null, req, res).createValidationType("genres");
  const invalidData = genreObject.validateRequestedData();
  if (invalidData) return;
  let genre = new Genre({
    genreName: req.body.name,
  });
  genre = await genre.save();
  res.send(genre);
  res.end();
});

//Update a specific genre
router.put("/:id", async (req, res) => {
  const genres = await Genre.find();
  const genreObject = new Validation(genres, req, res).createValidationType("genres");
  const genreExist = genreObject.checkIfDocumentExist();
  if (!genreExist) return;
  const invalidData = genreObject.validateRequestedData();
  if (invalidData) return;
  const genre = genreObject.findSpecificDocument();
  if (!genre) return;
  const updateGenre = await Genre.updateOne(
    { _id: req.params.id },
    {
      $set: {
        genreName: req.body.name,
      },
    }
  );
  res.send(updateGenre);
  res.end();
});

//Delete Specific genre
router.delete("/:id", async (req, res) => {
  const genres = await Genre.find();
  const genreObject = new Validation(genres, req, res).createValidationType("genres");
  const genreExist = genreObject.checkIfDocumentExist();
  if (!genreExist) return;
  const deleteGenre = await Genre.deleteOne({
    _id: req.params.id,
  });
  res.send(deleteGenre);
  res.end();
});

module.exports = router;
