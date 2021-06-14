var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
var {managerAuth, staffAuth} = require('./auth_middleware/auth')
require('./db');

var noauthManagerContoller = require('./contoller/NoauthManagerContoller');
var noauthStaffContoller = require('./contoller/NoauthStaffController');
var managerContoller = require('./contoller/ManagerController');
var staffContoller = require('./contoller/StaffController');

app.use('/api/manager', noauthManagerContoller);
app.use('/api/staff', noauthStaffContoller);

app.use('/api/admin/manager',managerAuth);
app.use('/api/admin/manager', managerContoller);

app.use('/api/user/staff', staffAuth );
app.use('/api/user/staff', staffContoller);

module.exports = app;