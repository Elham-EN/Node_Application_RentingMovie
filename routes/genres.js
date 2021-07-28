const utilitiesModule = require("../utility/UtilityFunctions");
const findSpecificGenre = utilitiesModule.findSpecificGenre;
const checkIfGenreExist = utilitiesModule.checkIfGenreExist;
const validateRequestData = utilitiesModule.validateRequestData;

const express = require("express");
const router = express.Router();

const genres = [
  { id: 1, name: "Action" },
  { id: 2, name: "Comedy" },
  { id: 3, name: "Horror" },
  { id: 4, name: "Romance" },
  { id: 5, name: "Kids" },
  { id: 6, name: "Sci-fi" },
];

//Fetch collection of genres
router.get("/", (req, res) => {
  res.send(genres);
  res.end();
});

//Fetch single genre
router.get("/:id", (req, res) => {
  const genre = checkIfGenreExist(genres, req, res);
  if (!genre) return;
  res.send(`<h1>Genre ID: ${genre.id} Genre Name: ${genre.name}</h1>`);
  res.end();
});

//Create a new Genre
router.post("/", (req, res) => {
  const invalidData = validateRequestData(req, res);
  if (invalidData) return;
  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
  res.end();
});

//Update a specific genre
router.put("/:id", (req, res) => {
  const genreExist = checkIfGenreExist(genres, req, res);
  if (!genreExist) return;
  const invalidData = validateRequestData(req, res);
  if (invalidData) return;
  const genre = findSpecificGenre(genres, req);
  if (!genre) return;
  genre.name = req.body.name;
  res.send(genre);
  res.end();
});

//Delete Specific genre
router.delete("/:id", (req, res) => {
  const genreExist = checkIfGenreExist(genres, req, res);
  if (!genreExist) return;
  const indexOfGenre = genres.indexOf(genreExist);
  genres.splice(indexOfGenre, 1);
  res.send(genreExist);
  res.end();
});

module.exports = router;
