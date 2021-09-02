var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
// var {managerAuth, staffAuth} = require('./auth_middleware/auth')
require('./db');

// var noauthManagerContoller = require('./contoller/NoauthManagerContoller');
// var noauthStaffContoller = require('./contoller/NoauthStaffController');
var rentalRequestController = require('./contoller/RentalRequestController');
var propertyController = require('./contoller/PropertyController');
var userController = require('./contoller/UserController');

// app.use('/api/manager', noauthManagerContoller);
// app.use('/api/staff', noauthStaffContoller);

// app.use('/api/admin/manager',managerAuth);
app.use('/api/user/rental_request', rentalRequestController);

// app.use('/api/user/property', staffAuth );
app.use('/api/user/property', propertyController);
app.use('/api/user', userController);

module.exports = app;