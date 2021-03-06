"use strict";

function Customer() {
  this.tableName = 'customers';
  this.columnNames = [
    'id', // INTEGER PRIMARY KEY
    'name', // TEXT NOT NULL
    'registered_at', // TEXT
    'address', // TEXT
    'city', // TEXT
    'state', // TEXT
    'postal_code', // TEXT
    'phone TEXT', // TEXT
    'account_balance' // INTEGER NOT NULL DEFAULT 0
  ];
}

Customer.prototype = require('./database').prototype;

Customer.prototype.rentals = function rentals(customerID, callback) {
  var db = this.openDB();
  var statement = 'SELECT "rentals".* FROM "rentals" WHERE "rentals"."customer_id" = ? ORDER BY "rentals"."checkout_date" ASC';

  db.all(statement, customerID, function(err, rows) {
    if (err) { console.log('!!!!ERROR!!!! In Customer#rentals.'); } // FIXME: how is error tracking best handled?

    callback(err, rows);
    db.close();
  });
}

Customer.prototype.overdue = function overdue(callback) {
  var db = this.openDB();
  var statement = "SELECT customers.id AS customer_id, customers.name, rentals.movie_title, rentals.checkout_date, rentals.id AS rental_id FROM customers INNER JOIN rentals ON customers.id = rentals.customer_id WHERE rentals.return_date = '' AND date('now') > DATETIME(rentals.checkout_date, '+7 days');";

  db.all(statement, function(err, rows) {
    callback(err, rows);
    db.close();
  });
}

// Customer.prototype.movies = function movies(customerID, callback) {
//   var db = this.openDB();
//   var statement = 'SELECT "movies".* FROM "movies" INNER JOIN "rentals" ON "movies"."title" = "rentals"."movie_title" WHERE "rentals"."customer_id" = ?';

//   db.all(statement, customerID, function(err, rows) {
//     if (err) { console.log('!!!!ERROR!!!! In Customer#movies.'); } // FIXME: how is error tracking best handled?

//     callback(err, rows);
//     db.close();
//   });
// }

module.exports = Customer;
