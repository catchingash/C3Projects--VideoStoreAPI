"use strict";

var Movie = require('../models/movie');

var Controller = {
  index: function(req, res, next) {
    if (req.query.sort) {
      new Movie().sortBy(req.query.sort, req.query.n, req.query.p, Controller.sendJSON.bind(res));
    } else {
      new Movie().all(Controller.sendJSON.bind(res));
    }
  },

  sendJSON: function(err, res) {
    if (err) {
      this.status(500).json(err);
    } else {
      this.status(200).json(res);
    }
  }
}

module.exports = Controller;
