const Validation = require("../validation/validationFactory");
const Customer = require("../model/customer");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.send(`<h2> ${customers} </h2>`);
  res.end();
});

router.get("/:id", async (req, res) => {
  const customers = await Customer.find();
  const custObj = new Validation(customers, req, res).createValidationType("customers");
  const customer = custObj.checkIfDocumentExist();
  if (!customer) return;
  res.send(`<h1> Customer ID: ${customer._id} Customer Name: ${customer.name}</h1>`);
  res.end();
});

router.post("/", async (req, res) => {
  const custObj = new Validation(null, req, res).createValidationType("customers");
  const invalidData = custObj.validateRequestedData();
  if (invalidData) return;
  let customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  customer = await customer.save();
  res.send(customer);
  res.end();
});

router.put("/:id", async (req, res) => {
  const customers = await Customer.find();
  const custObj = new Validation(customers, req, res).createValidationType("customers");
  const customerExist = custObj.checkIfDocumentExist();
  if (!customerExist) return;
  const invalidData = custObj.validateRequestedData();
  if (invalidData) return;
  const customer = custObj.findSpecificDocument();
  if (!customer) return;
  const updateCustomer = await Customer.updateMany(
    { _id: req.params.id },
    {
      $set: {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone,
      },
    }
  );
  res.send(updateCustomer);
  res.end();
});

router.delete("/:id", async (req, res) => {
  const customers = await Customer.find();
  const custObj = new Validation(customers, req, res).createValidationType("genres");
  const customerExist = custObj.checkIfDocumentExist();
  if (!customerExist) return;
  const deleteCustomer = await Customer.deleteOne({
    _id: req.params.id,
  });
  res.send(deleteCustomer);
  res.end();
});

module.exports = router;
