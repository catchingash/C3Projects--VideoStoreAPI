"use strict";

var express = require('express');
var router = express.Router();
var Controller = require('../controllers/rentals');

router.post('/', Controller.create);
router.put('/:customer_id', Controller.update);

module.exports = router;
