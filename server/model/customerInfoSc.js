const mongoose = require('mongoose');

const customerInfoSc = new mongoose.Schema({
    zone: {
        type: String,
    },
    dataSource: {
        type: String,
    },
    employee: {
        type: String,
    },
    category: {
        type: String,
    },
    name: {
        type: String,
    },
    address: {
        type: Array,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    whatsapp: {
        type: String,
    },
    details:{
        type: String,
    },
    followCheck: {
        type: String,
        default: 'empty'
    },
    is_customer: {
        type: String,
        default: '0'
    },
    cancel_cause: {
        type: String,
    },
    confirm_status: {
        type: String
    },
    followUpDate: {
        type: Date,
    },
    reFollowUpDate:{
        type: String,
    },
    serviceDate: {
        type: Date,
    },
    follows: {
        type: Object,
    },
    is_active: {
        type: String,
        default: '1',
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('customer_info_sc', customerInfoSc);