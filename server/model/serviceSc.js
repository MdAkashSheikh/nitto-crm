const mongoose = require('mongoose');

const serviceSc = new mongoose.Schema({
    service_id: {
        type: String,
        require: true,
    },
    service_name: {
        type: String,
        require: true,
    },
    base_price: {
        type: Number,
        require: true,
    },
    completion_time: {
        type: String,
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

module.exports = mongoose.model('service_sc', serviceSc);