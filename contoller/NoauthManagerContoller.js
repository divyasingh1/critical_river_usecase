var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var ManagerService = require('./ManagerService');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const  manager_registration_token =  process.env.manager_registration_token || "some_secret_token";

//signup
router.post('/signup', function (req, res) {
    var managerServiceInst = new ManagerService();
    if(!req.headers['x-registration-token'] || (req.headers['x-registration-token'] !== manager_registration_token)){
       res.status(401).send("Access Denied");
    }else{
    return managerServiceInst.createUser(req.body)
        .then((token) => {
            res.send({ "status": "SUCCESS", "token": token });
        })
        .catch((err) => {
            res.status(400).send({ status: "Failed" });
        });
    }
});

//login
router.post('/login', function (req, res) {
    var managerServiceInst = new ManagerService();
    return managerServiceInst.loginUser(req.body)
        .then((sessionData) => {
            res.send(sessionData);
        })
        .catch((err) => {
            res.status(401).send({ status: "Failed" });
        });
});

module.exports = router;