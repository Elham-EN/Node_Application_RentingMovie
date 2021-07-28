const express = require("express");
const router = express.Router();

//Homepage route
router.get("/", (req, res) => {
  res.send(`<h1>Welcome to Renting Movie Application</h1>`);
  res.end();
});

module.exports = router;
