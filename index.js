const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const home = require("./routes/home");
const rentals = require("./routes/rentals");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost/movieDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to the MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

app.use(express.json());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/", home);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
