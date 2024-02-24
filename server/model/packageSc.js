const mongoose = require('mongoose');

const packageSc = new mongoose.Schema({
    service_name: {
        type: String,
        required: true,
    },
    pkg_details: {
        type: Array,
        required: true
    },
    is_active: {
        type: String,
        default: "1",
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('package_service', packageSc);