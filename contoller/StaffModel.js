var Staff = require('./Staff');
var Promise = require('bluebird');
const { v4: uuidv4 } = require('uuid');

class StaffModel {
    constructor() {
    }

    findStaffById(id) {
        return new Promise(function (resolve, reject) {
            Staff.findById(id, function (err, user) {
                if (err) {
                    console.log("Error in finding staff", err);
                    return reject("Error in finding staff");
                }
                if (!user) {
                    console.log("Staff not found");
                    return reject("Staff not found");
                }
                return resolve(user)
            });
        });
    }

    findStaffByEmail(email) {
        return new Promise(function (resolve, reject) {
            Staff.findOne({email: email}, function (err, user) {
                if (err) {
                    console.log("Error in finding staff", err);
                    return reject("Error in finding staff");
                }
                if (!user) {
                    console.log("Staff not found");
                    return reject("Staff not found");
                }
                return resolve(user)
            });
        });
    }

    createStaff(details) {
        details._id = uuidv4();
        details.staff_id = uuidv4();
        console.log("details", details)
        return new Promise(function (resolve, reject) {
            return Staff.create(details, function (err, user) {
                if (err) {
                    console.log("Error in creating staff", err)
                    return reject("Error in creating staff");
                }
                return resolve(user)
            });
        });
    }

    updateStaff(staff_id, data){
        return new Promise ((resolve, reject)=>{
            Staff.updateMany(
            {
                "staff_id": staff_id,
            },
            {
                "$set":
                    data
            }
         , (err, res)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(res)
                }
            })
        })
    }
}

module.exports = StaffModel;