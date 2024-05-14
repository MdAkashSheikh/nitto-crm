const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const User = require('../model/userSc');


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

//Register User
const registerUser = async(req, res) => {
    const { name, email, password } = req.body;

    try {
        if(!name || !email || !password) {
            res.status(400).json('please fill in all required fields')
        }

        if(password.length < 6) {
            res.status(400).json('Password must be up to 6 characters')
        }

        const userExists = await User.findOne({ email })
        if(userExists) {
            res.status(400).json('email has already been registered')
        }

        //Create User
        const user = await User.create({
            name, email, password
        })

        //Generate token
        const token = generateToken(user._id)

        res.cookie('token', token, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite: true,
            secure: true
        })

        if(user) {
            const { _id, name, email } = user;
            res.status(201).json({
                _id, name, email
            })
        } else {
            res.status(400).json('Invalid user data')
        }

    } catch (error) {
        res.status(400).json({
            message: 'Error form user registration!',
            error
        })
    }
}


module.exports = {
    registerUser,

}