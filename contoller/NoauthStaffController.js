var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var StaffService = require('./StaffService');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//login
router.post('/login', function (req, res) {
    var staffServiceInst = new StaffService();
    return staffServiceInst.loginUser(req.body)
        .then((sessionData) => {
            res.send(sessionData);
        })
        .catch((err) => {
            res.status(401).send({ status: "Failed" });
        });
});

module.exports = router;