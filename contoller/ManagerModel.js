var Manager = require('./Manager');
var Promise = require('bluebird');
const { v4: uuidv4 } = require('uuid');

class ManagerModel {
    constructor() {
    }

    findById(id) {
        return new Promise(function (resolve, reject) {
            Manager.findById(id, function (err, user) {
                if (err) {
                    console.log("Error in finding manager", err);
                    return reject("Error in finding manager");
                }
                if (!user) {
                    console.log("Manager not found");
                    return reject("Manager not found");
                }
                return resolve(user)
            });
        });
    }

    pushStaffId(manager_id, staff_id){
        console.log(">>>>>>", manager_id, staff_id)
        return new Promise ((resolve, reject)=>{
            Manager.updateMany(
            {
                "manager_id": manager_id
            },
            {
                "$push": { staff_ids: staff_id } ,
            }, (err, res)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(res)
                }
            })
        });
    }

    findByEmail(email) {
        return new Promise(function (resolve, reject) {
            Manager.findOne({email: email}, function (err, user) {
                if (err) {
                    console.log("Error in finding manager", err);
                    return reject("Error in finding manager");
                }
                if (!user) {
                    console.log("Manager not found");
                    return reject("Manager not found");
                }
                return resolve(user)
            });
        });
    }

    createUser(details) {
        details._id = uuidv4();
        details.manager_id =  uuidv4();
        return new Promise(function (resolve, reject) {
            return Manager.create(details, function (err, user) {
                if (err) {
                    console.log("Error in creating manager", err)
                    return reject("Error in creating manager");
                }
                return resolve(user)
            });
        });
    }

    updateManager(manager_id, data){
        return new Promise ((resolve, reject)=>{
            Manager.updateMany(
            {
                "manager_id": manager_id,
            },
            {
                "$set":
                    data,
            }, (err, res)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(res)
                }
            })
        })
    }
}

module.exports = ManagerModel;