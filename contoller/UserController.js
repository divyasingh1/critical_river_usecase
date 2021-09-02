var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var UserService = require('./UserService');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.patch('/:UserId', function (req, res) {
    var UserServiceInst = new UserService();
    return UserServiceInst.updateUser(req.params.UserId, req.body)
        .then((data) => {
            res.send({ "status": "SUCCESS",  message: "User updated successfully" });
        })
        .catch((err) => {
            res.status(400).send({ status: "Failed" ,  message: "User Couldn't be updated successfully", error: err});
        });
});

router.post('/', function (req, res) {
    var UserServiceInst = new UserService();
    req.userId = "321"
    return UserServiceInst.createUser(req.userId, req.body)
        .then((data) => {
            res.send({ "status": "SUCCESS" , message: "User Created Successfully", data});
        })
        .catch((err) => {
            console.log("Error in create User", err);
            res.status(400).send({ status: "Failed",  message: "User Couldn't be fetched successfully", error: err });
        });
});


router.get('/', function (req, res) {
    var UserServiceInst = new UserService();
    return UserServiceInst.findUser(req.query)
        .then((data) => {
            res.send({ "status": "SUCCESS", message: "User Fetched Successfully", data: data });
        })
        .catch((err) => {
            res.status(500).send({ status: "Failed" , message: "User Couldn't be fetched successfully", error: err});
        });
});


module.exports = router;