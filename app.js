var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var productService = require('./public/scripts/webapi/productService');
var userService = require('./public/scripts/webapi/userService');
var diseaseService = require('./public/scripts/webapi/diseaseService');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tfl')
    .then(() => console.log('DB connection succesful'))
    .catch((err) => console.error(err));

var app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/products', productService);
// http://localhost:7000/api/products/1305
app.use('/api/users', userService);
// http://localhost:7000/api/users/1001
app.use('/api/diseases', diseaseService);
// http://localhost:7000/api/diseases/13

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;