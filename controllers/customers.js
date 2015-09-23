"use strict";

var Customer = require('../models/customer');

var Controller = {
  index: function(req, res, next) {
    new Customer().all(Controller.sendJSON.bind(res));
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
