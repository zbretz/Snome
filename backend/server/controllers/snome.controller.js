const Snome = require("../models/snome.model.js");

// Create and Save a new Snome
exports.create = (req, res) => {
  // Validate request
  if (!req.body.owner_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Snome
  const snome = {
    owner_id: req.body.owner_id,
    location_id: req.body.location_id,
    header: req.body.header,
    time_to_mountain: req.body.time_to_mountain,
    mountain_access: req.body.mountain_access,
    availability_start: req.body.availability_start,
    availability_end: req.body.availability_end,
    street_address: req.body.street_address,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    number_of_beds: req.body.number_of_beds,
    perks: req.body.perks,
    snome_description: req.body.snome_description,
    //nice demo of alernative to 'default in schema:
    //published: req.body.published ? req.body.published : false
  };

  console.log(req.body.owner_id)
  res.send(req.body)

  // Save the Snome in the database

  // Snome.create(snome)
  //   .then(data => {
  //     res.send(data);x
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while creating the Snome."
  //     });
  //   });

};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

  Snome.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Snome."
      });
    });

};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Snome.findOne(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Snome."
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};