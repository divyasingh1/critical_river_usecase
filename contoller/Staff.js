var mongoose = require('mongoose');
var StaffSchema = new mongoose.Schema({
    _id:{
        type: String,
        require: true
    },
    staff_id:{
        type: String,
        require: true
    },
    manager_id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        require: true
    },
    salary:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    role:{
        type: String,
        default: 'staff'
    },
    password:{
        type: String,
        required: true
    },
    joining_date:{
        type: Date
    },
    mobile:{
        type: Number
    },
    catagory: {
        type: String,
        require: true
    }
},
{
    timestamps: true
});

mongoose.model('staffs',StaffSchema);

module.exports = mongoose.model('staffs');