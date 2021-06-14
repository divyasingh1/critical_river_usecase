var StaffModel = require('./StaffModel');
var Promise = require('bluebird');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const  secretkey =  process.env.secretkey || 'secretkey';

class StaffService {
    constructor() {
    }

    createStaffUser(details) {
        let userdetails;
        return this.encryptString(details.password)
            .then((encyptedPassword) => {
                details.password = encyptedPassword;
                var staffModelInst = new StaffModel();
                return staffModelInst.createStaff(details)
            })
            .then((user) => {
                userdetails =  user;
                return this.createSession(user);
            })
            .then((sessionData) => {
                return {
                    token: sessionData.token,
                    data: userdetails
                }
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
        console.log("user", user.staff_id)
        var token = await this.jwtEncode({
            staff_id: user.staff_id,
            name: user.name,
            email: user.email,
            role:user.role,
            catagory: user.catagory
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
                staff_is: user.staff_id,
                token: sessionData.token,
                email: user.email,
                role: user.role
            });
        })
        .catch((err)=>{
            return Promise.reject(err)
        })
    }


    findByEmail(email){
        var staffModelInst = new StaffModel();
        return staffModelInst.findStaffByEmail(email);
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

    updateStaffUser(staff_id, data){
        var staffModelInst = new StaffModel();
        return staffModelInst.updateStaff(staff_id, data);
    }
}


module.exports = StaffService;
