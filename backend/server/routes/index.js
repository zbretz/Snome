// const controller = require('./controllers');
// const router = require('express').Router();

// /* define API url to handler mappings here */

// /* FOR BAREBONES TESTING ONLY */
// router.get('/snome', controller.get.getAll);
// // router.post('/snomes', controller.post.create);

// module.exports = router;



// exports.snomes = require('./snomes.js');
// exports.users = require('./users.js');

var express = require('express');
var router = express.Router();

var snomes = require('./snomes.js')
var users = require('./users.js')

router.use('snomes', snomes);
// app.use('quotes', users);


// exports.get = require('./get');
// exports.post = require('./post');
// exports.put = require('./put');
