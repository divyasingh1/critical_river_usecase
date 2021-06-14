var mongoose = require('mongoose');
var ManagerSchema = new mongoose.Schema({
    _id:{
        type: String,
        require: true
    },
    manager_id:{
        type: String,
        require: true,
        unique: true
    },
    name:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    role:{
        type: String,
        default: 'manager'
    },
    password:{
        type: String,
        required: true
    },
    license:{
        type: String
    },
    mobile:{
        type: Number
    },
    staff_ids: [ ]
},
{
    timestamps: true
});

mongoose.model('managers',ManagerSchema);

module.exports = mongoose.model('managers');