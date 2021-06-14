var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var ManagerService = require('./ManagerService');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());



router.patch('/update_manager', function (req, res) {
    var managerServiceInst = new ManagerService();
    return managerServiceInst.updateManager(req.manager_id, req.body)
        .then((data) => {
            res.send({ "status": "SUCCESS"});
        })
        .catch((err) => {
            res.status(400).send({ status: "Failed" });
        });
});

router.patch('/update_staff/:staff_id', function (req, res) {
    var managerServiceInst = new ManagerService();
    return managerServiceInst.updateStaff(req.params.staff_id, req.body)
        .then((data) => {
            res.send({ "status": "SUCCESS"});
        })
        .catch((err) => {
            res.status(400).send({ status: "Failed" });
        });
});


router.post('/create_staff', function (req, res) {
    var managerServiceInst = new ManagerService();
    return managerServiceInst.createStaffUser(req.manager_id, req.body)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(401).send({ status: "Failed" });
        });
});

module.exports = router;