var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var StaffService = require('./StaffService');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.patch('/update_staff', function (req, res) {
    var staffServiceInst = new StaffService();
    return staffServiceInst.updateStaffUser(req.staff_id, req.body)
        .then((token) => {
            res.send({ "status": "SUCCESS" });
        })
        .catch((err) => {
            res.status(400).send({ status: "Failed" });
        });
});


module.exports = router;