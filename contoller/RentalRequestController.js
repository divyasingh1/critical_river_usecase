var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var RentalRequestService = require('./RentalRequestService');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


router.patch('/:rentalRequestId', function (req, res) {
    var rentalRequestServiceInst = new RentalRequestService();
    req.userId = req.user.userId;
    return rentalRequestServiceInst.updateRentalRequest(req.params.rentalRequestId, req.userId)
        .then((data) => {
            res.send({ "status": "SUCCESS", message: "Rental request Approved successfully"});
        })
        .catch((err) => {
            res.status(400).send({ status: "Failed" , message: "Rental request couldn't be Approved successfully", error: err});
        });
});


router.post('/', function (req, res) {
    var rentalRequestServiceInst = new RentalRequestService();
    req.userId = req.user.userId;
    if(!req.body.propertyId){
        return res.status(400).send({ status: "Failed" , message: "PropertyId is required"});
    }
    return rentalRequestServiceInst.createRentalRequest(req.userId, req.body)
        .then((data) => {
            res.send({ "status": "SUCCESS", message: "Rental request Sent successfully",data});
        })
        .catch((err) => {
            res.status(400).send({ status: "Failed" , message: "Rental request couldn't be created successfully", error: err});
        });
});


router.get('/', function (req, res) {
    var rentalRequestServiceInst = new RentalRequestService();
    return rentalRequestServiceInst.findRentalRequest(req.query)
        .then((data) => {
            res.send({ "status": "SUCCESS", message: "Rental requests Fetched Successfully", data: data });
        })
        .catch((err) => {
            res.status(500).send({ status: "Failed" , message: "rental requests Couldn't be fetched successfully", error: err});
        });
});

module.exports = router;