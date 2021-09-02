var _ = require('lodash');
// var jwt = require('jsonwebtoken');
// var StaffService = require("../contoller/StaffService");
// var ManagerService = require("../contoller/ManagerService");
// const  secretkey =  process.env.secretkey || 'secretkey';
var user = require('../controller/user');

async function verify_user(username, public_key) {
    _user = user.findByEmail(username); // XXX: Will this work?
    if (_user) {
        return _user;
    }
    else {
        return res.status(401).send("Access Denied!");
    }
}

async function managerAuth(req, res, next) {
    var token;
    if (req.headers['username']) {
        var usernameString = req.headers['username'];
    } else {
        return res.status(401).send("Access denied. No username provided.");
    }
    if (req.headers['public_key']) {
        var public_key = req.headers['public_key'];
    } else {
        return res.status(401).send("Access denied. No username provided.");
    }
    try {
        var user = jwt.verify(usernameString, public_key);
        let managerServiceInst = new ManagerService();

        if (user) {
            var userFromdb = await managerServiceInst.findByEmail(user.email);
            if(userFromdb.email !== user.email){
                return res.status(401).send("Access denied!!");
            }
            req.user = user;
            return next();
        }
        return res.status(401).send("Access denied!");
    } catch (err) {
        console.log("ERROR while login", err);
        return res.status(401).send("Access denied!!!!");
    }
}


// async function staffAuth(req, res, next) {
//     var token;
//     if (req.headers['authorization']) {
//         var authString = req.headers['authorization'];
//         var authStringParam = _.compact(authString.split(' '));
//         if (authStringParam.length != 2) {
//             return res.status(401).send("Access denied!!");
//         }
//         token = authStringParam[1];
//     } else {
//         return res.status(401).send("Access denied. No token provided.");
//     }
//     try {
//         var user = jwt.verify(token, secretkey);
//         if (user) {
//             let staffServiceInst = new StaffService();
//             let userFromdb = await staffServiceInst.findByEmail(user.email);
//             if(userFromdb.email !== user.email){
//                 return res.status(401).send("Access denied!");
//             }
//             if (user.role === 'staff') {
//                 req.user = user;
//                 req.staff_id = user.staff_id;
//                 return next();
//             } else {
//                 return res.status(401).send("Access denied!!!");
//             }
//         }
//         return res.status(401).send("Access denied!!");
//     } catch (err) {
//         console.log("ERROR while login", err);
//         return res.status(401).send("Access denied!!");
//     }
// }


// module.exports = {
//     managerAuth,
//     staffAuth
// }