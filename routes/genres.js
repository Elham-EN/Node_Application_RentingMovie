const utilitiesModule = require("../utility/UtilityFunctions");
const findSpecificGenre = utilitiesModule.findSpecificGenre;
const checkIfGenreExist = utilitiesModule.checkIfGenreExist;
const validateRequestData = utilitiesModule.validateRequestData;

const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/movieDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

const genreSchema = new mongoose.Schema({
  genreID: { type: Number, required: true },
  genreName: { type: String, required: true },
});

const Genre = mongoose.model("Genre", genreSchema);

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
  const genre = checkIfGenreExist(genres, req, res);
  if (!genre) return;
  res.send(
    `<h1>Genre ID: ${genre.genreID} Genre Name: ${genre.genreName}</h1>`
  );
  res.end();
});

async function createGenre(genreObject) {
  const genre = new Genre(genreObject);
  try {
    const result = await genre.save();
    console.log(result);
  } catch (exception) {
    for (field in exception.errors) {
      console.log(exception.errors[field].message);
    }
  }
}

//Create a new Genre
router.post("/", async (req, res) => {
  const invalidData = validateRequestData(req, res);
  if (invalidData) return;
  const genres = await Genre.find();
  const genre = {
    genreID: genres.length + 1,
    genreName: req.body.name,
  };
  createGenre(genre);
  res.send(genre);
  res.end();
});

//Update a specific genre
router.put("/:id", async (req, res) => {
  const genres = await Genre.find();
  const genreExist = checkIfGenreExist(genres, req, res);
  if (!genreExist) return;
  const invalidData = validateRequestData(req, res);
  if (invalidData) return;
  const genre = findSpecificGenre(genres, req);
  if (!genre) return;
  const updateGenre = await Genre.updateOne(
    { genreID: req.params.id },
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
  const genreExist = checkIfGenreExist(genres, req, res);
  if (!genreExist) return;
  const deleteGenre = await Genre.deleteOne({
    genreID: req.params.id,
  });
  res.send(deleteGenre);
  res.end();
});

module.exports = router;
