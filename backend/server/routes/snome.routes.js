const snomes = require("../controllers/snome.controller.js");
var router = require("express").Router();

// Create a new Snome
router.post("/", snomes.create);

// Retrieve all Snomes
router.get("/", snomes.findAll);

// Retrieve a single Snome with id
router.get("/:id", snomes.findOne);

// Update a Snome with id
router.put("/:id", snomes.update);

// Delete a Snome with id
router.delete("/:id", snomes.delete);


module.exports = router;
