const mongoose  = require('mongoose');

const convertCustomerSc = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    slot: {
        type: String,
        required: true,
    },
    team_member: {
        type: Array,
        required: true,
    },
    team_lead: {
        type: String,
        required: true,
    },
    customerId: {
        type: String,
        required: true,
    },
    confirm_status: {
        type: String,
        default: 'confirm'
    },
    cancel_cause: {
        type: String,
        default: '',
    },
    is_active: {
        type: String,
        default: "1",
    }
})


module.exports = mongoose.model('Converted_Customer', convertCustomerSc);