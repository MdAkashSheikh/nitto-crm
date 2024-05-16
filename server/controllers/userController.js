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
            return res.status(400).json({
                message: 'please fill in all required fields'
            })
        }

        if(password.length < 6) {
            return res.status(400).json({
                message: 'Password must be up to 6 characters'
            })
        }

        const userExists = await User.findOne({ email })
        if(userExists) {
            return res.status(400).json({
                message: 'Email already exists'
            })
            // throw new Error('Email aleady exists')
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
                message: 'Succesfully Registard!',
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

//Login User
const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({
                message: 'Please add email and password'
            })
        }

        //User Exists
        const user = await User.findOne({ email })

        //Generate Token
        const token = generateToken(user._id)

        res.cookie('token', token, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 86400), // 1 Day
            sameSite: 'none',
            secure: true
        })

        if(!user) {
            return res.status(400).json({
                message: 'User not found please Sign Up!'
            })
        }

        const passwordCorrect = await bcrypt.compare(password, user.password)

        if(user && passwordCorrect) {
            const { _id, name, email } = user;
            res.status(200).json({
                _id, name, email, token
            })
        } else {
            return res.status(400).json({
                message: 'Invalid email and password'
            });
        }

    } catch (error) {
        res.status(400).json({
            message: 'error from login',
            error
        })
    }
}

//Logout User
const logoutUser = async(req, res) => {

    try {
        res.cookie('token', '', {
            path: '/',
            httpOnly: true,
            expires: new Date(0),
            sameSite: 'none',
            secure: true
        })
    
        return res.status(200).json({ 
            message: 'Successfully Logged Out'
        })
        
    } catch (error) {
        res.status(400).json({
            message: 'You are not logged in, Please login',
            error
        })
    }
}

//Get Single User
const getUser = async(req, res) => {
    try {
        const email = req.params.email;

        const oneData = await User.findOne({ email })

        if(!oneData) {
            return res.status(404).json({
                message: 'No not found',
            })
        }

        res.status(200).json(oneData)
    } catch (error) {
        res.status(400).json({
            message: 'Error from get user',
            error
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
}