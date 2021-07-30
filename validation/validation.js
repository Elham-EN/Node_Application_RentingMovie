class DataValidation {
  constructor(collection, request, response) {
    this.collection = collection;
    this.request = request;
    this.response = response;
  }

  findSpecificDocument() {
    return this.collection.find((c) => c._id == this.request.params.id);
  }

  checkIfDocumentExist() {
    const document = this.findSpecificDocument();
    if (!document)
      return this.response
        .status(404)
        .send(`The course with the given id ${this.request.params.id} was not found`)
        .end();
    return document;
  }

  validateRequestedData() {
    let badData;
    if (!this.request.body.name)
      badData = this.response.status(400).send("Name is required & must not be empty");
    else if (this.request.body.name.length < 3)
      badData = this.response.status(400).send("should be minimum 3 characters");
    else if (typeof this.request.body.name !== "string")
      badData = this.response.status(400).send("name should be string");
    return badData;
  }
}

module.exports = DataValidation;
