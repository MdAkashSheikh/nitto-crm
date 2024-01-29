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
    nid: {
        type: Array,
        default: [],
    },
    photo: {
        type: Array,
        default: [],
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = model('teaminfo_sc', teamInfoSc);