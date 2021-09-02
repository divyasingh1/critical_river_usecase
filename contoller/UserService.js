const { db } = require('./User');
var UserModel = require('./UserModel');

class UserService {
    constructor() {
    }

    createUser(userId,details) {
        details.userId = userId;
        var UserModelInst = new UserModel();
        return UserModelInst.createUser(details);
    }
    
    findUser(filter){
        let dbFilter = {};
        if(filter.UserId){
            dbFilter.UserId = filter.UserId;
        }
        if(filter.userId){
            dbFilter.userId =  filter.userId;
        }
        var UserModelInst = new UserModel();
        return UserModelInst.findUser(dbFilter);
    }
    

    updateUser(id, data){
        var UserModelInst = new UserModel();
        return UserModelInst.updateUser(id, data);
    }
}


module.exports = UserService;
