const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add a email'],
        unique: true,
        trim: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
            'Please enter a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minLength: [6, 'Password must be up to 6 characters'],
    },
    isPermission: {
        type: String,
        default: '0'
    }
},
{
    timestamps: true
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        return next();
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;

    next();
})

const User = mongoose.model('User', userSchema)
module.exports = User;