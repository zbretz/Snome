const snomes = require("../controllers/snome.controller.js");
var router = require("express").Router();

module.exports =  {


  // Create a new Tutorial
  router.post("/", snomes.create);

  // Retrieve all snomes
  router.get("/", snomes.findAll);

  // Retrieve all published snomes
  router.get("/published", snomes.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", snomes.findOne);

  // Update a Tutorial with id
  router.put("/:id", snomes.update);

  // Delete a Tutorial with id
  router.delete("/:id", snomes.delete);

  // Create a new Tutorial
  router.delete("/", snomes.deleteAll);

};