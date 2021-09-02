var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    _id:{
        type: String,
        require: true
    },
    emailId:{
        type: String,
        require: true
    },
    publicKey:{
        type: String,
        require: true
    },
    UserId:{
        type: String,
        require: true
    },
    userId:{
        type: String,
        required: true
    },
    UserName:{
        type: String
    }
},
{
    timestamps: true
});

mongoose.model('user',UserSchema);

module.exports = mongoose.model('user');