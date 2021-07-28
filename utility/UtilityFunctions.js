function findSpecificGenre(genres, request) {
  return genres.find((c) => c.genreID === parseInt(request.params.id));
}

function checkIfGenreExist(genres, request, response) {
  const course = findSpecificGenre(genres, request);
  if (!course)
    return response
      .status(404)
      .send(`The course with the given id ${request.params.id} was not found`)
      .end();
  return course;
}

function validateRequestData(request, response) {
  let badData;
  if (!request.body.name)
    badData = response.status(400).send("Name is required & must not be empty");
  else if (request.body.name.length < 3)
    badData = response.status(400).send("should be minimum 3 characters");
  else if (typeof request.body.name !== "string")
    badData = response.status(400).send("name should be string");
  return badData;
}

//Exporting multiple functions
module.exports = {
  findSpecificGenre,
  checkIfGenreExist,
  validateRequestData,
};
