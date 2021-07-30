const DataValidation = require("./validationFactory");

/**
 * Defining an interface for creating an object but letting the subclasses of
 * the parent class to decide which class to instantiate.
 */
class ValidationFactory {
  constructor(collection, request, response) {
    this.collection = collection;
    this.request = request;
    this.response = response;
  }
  createValidationType(collectionType) {
    switch (collectionType) {
      case "customers":
        return new DataValidation(this.collection, this.request, this.response);
      case "genres":
        return new DataValidation(this.collection, this.request, this.response);
    }
  }
}

module.exports = ValidationFactory;
