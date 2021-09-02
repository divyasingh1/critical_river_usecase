var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
var {verify_user} = require('./auth_middleware/auth')
require('./db');

var rentalRequestController = require('./contoller/RentalRequestController');
var propertyController = require('./contoller/PropertyController');
var userController = require('./contoller/UserController');

app.use('/api/user', userController);

app.use('/api/user/rental_request', verify_user );
app.use('/api/user/rental_request', rentalRequestController);

app.use('/api/user/property', verify_user );
app.use('/api/user/property', propertyController);


module.exports = app;