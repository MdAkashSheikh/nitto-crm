const jwt = require('jsonwebtoken')
const User = require('../model/userSc')

const protect = async(req, res) => {

    try {
        // const authHeader = req.headers['authorization']
        // const token = authHeader && authHeader.split(' ')[1]
    
        const token = req.cookies.token

        if(!token) {
            res.status(400).json('Not authorized please login')
        }

        //Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        //Get User Id from token
        user = await User.findById(verified.id).select('-password');

        if(!user) {
            res.status(404).json('User not found!')
        }

        req.user = user;
        next();
        
    } catch (error) {
        res.status(400).json({
            message: 'Not authorized please login!',
            error
        })
    }
    
}