const { Schema, model } = require('mongoose')

const teamInfoSc = new Schema({
    empId: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: [true, 'Please Enter name']
    },
    father_name: {
        type: String,
    },
    mother_name: {
        type: String,
    },
    phone: {
        type: Array,
        require: [true, 'Please Enter phone number']
    },
    emp_pic: {
        type: Array,
        default: [],
    },
    emp_nid: {
        type: Array,
        default: [],
    },
    is_active: {
        type: String,
        default: "1"
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = model('teaminfo_sc', teamInfoSc);