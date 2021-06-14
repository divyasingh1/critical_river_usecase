const ManagerModel = require('./ManagerModel');
const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const StaffService = require('./StaffService');
const _ = require("lodash");
const  secretkey =  process.env.secretkey || 'secretkey';

class ManagerService {
    constructor() {
    }

    createUser(details) {
        return this.encryptString(details.password)
            .then((encyptedPassword) => {
                details.password = encyptedPassword;
                var managerModelInst = new ManagerModel();
                return managerModelInst.createUser(details)
            })
            .then((user) => {
                return this.createSession(user);
            })
            .then((sessionData) => {
                return sessionData.token;
            })
            .catch((err)=>{
                return Promise.reject(err);
            })
    }

    encryptString(password) {
        return new Promise((resolve, reject) => {
            return bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    console.log("ERROR in bcrypt", err);
                    return reject(err);
                }
                return bcrypt.hash(password, salt, function (err, hash) {
                    if (err) {
                        console.log("ERROR in bcrypt", err);
                        return reject(err);
                    }
                    return resolve(hash)
                });
            });
        });
    }

    async createSession(user) {
        var token = await this.jwtEncode({
            _id: user._id,
            name: user.name,
            email: user.email,
            manager_id: user.manager_id,
            role:user.role
        });
        return {
            token
        };
    }

    jwtEncode(data) {
        return Promise.resolve(jwt.sign(data, secretkey).toString());
    }

    loginUser({email, password}){
        let user;
        email = email.toLocaleLowerCase();
        return this.findByEmail(email)
        .then((u)=>{
            if(!u){
                return Promise.reject();
            }
            user = u;
            return this.compareEncryptString(password, user.password);
        })
        .then((passwordMatched)=>{
            if(!passwordMatched){
                return Promise.reject();
            }
            return Promise.resolve(passwordMatched);
        })
        .then(()=>{
            return this.createSession(user);
        })
        .then((sessionData)=>{
            return Promise.resolve({
                manager_id: user.manager_id,
                token: sessionData.token,
                email: user.email,
                role: user.role
            });
        });
    }



    findByEmail(email){
        var managerModelInst = new ManagerModel();
        return managerModelInst.findByEmail(email);
    }

    compareEncryptString(string = '', hashString = ''){
        return new Promise((resolve, reject)=>{
            bcrypt.compare(string, hashString, function(err, result) {
                if(err){
                    return reject();
                }
                return resolve(result);
            });
        });
    }

    updateManager(manager_id, data){
        var managerModelInst = new ManagerModel();
        return managerModelInst.updateManager(manager_id, data);
    }

    updateStaff(staff_id, data){
        var input = Object.keys(data);
        for(let i = 0; i<input.length; i++){
        if(!["name", "category", "email", "password", "mobile"].includes(input[i])){
            console.log("Incorrect data");
            return Promise.reject("Incorrect data");
        }
        }
        var staffService =  new StaffService();
        return staffService.updateStaffUser(staff_id, data);
    }

   async  createStaffUser(manager_id, data){
        var input = Object.keys(data);
        for(let i = 0; i<input.length; i++){
        if(!["name", "salary", "joining_data", "email", "password"].includes(input[i])){
            return Promise.reject("Incorrect data");
        }
        }
        data.manager_id = manager_id;
        var staffService =  new StaffService();
        let user = await staffService.createStaffUser(data);
        var managerModelInst = new ManagerModel();
        await managerModelInst.pushStaffId(manager_id, data.staff_id);
        return user.data;
    }
}


module.exports = ManagerService;
