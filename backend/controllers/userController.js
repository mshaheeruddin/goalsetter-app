const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')


// @desc    Register New User
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async(req, res) => {
    const { name, email, password} = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all Fields!')
    }
    //check if user exist
    const userExists =  await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error('User already exist')
    }

    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }


    res.json({message: "Register User"})
})


// @desc     Authenticate a User
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
     
    //check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password) ) ) {
        res.json( {
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid Credentials')
    }

    res.json({message: "login User"})
})
// @desc    Get User
// @route   GET /api/users/me
// @access  Public
const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email} = await User.findById(req.user.id)
    
    res.status(200).json({
        id: _id,
        name,
        email,
    })
})

//Generate a JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
         expiresIn: '20d',
    })  
   
    
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
}