const mongoose = require('mongoose');

const contactSc = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: false,
    },
    is_active: {
        type: String,
        default: "1",
    },
}, 
{
    timestamps: true
})

module.exports = mongoose.model('contact_sc', contactSc)