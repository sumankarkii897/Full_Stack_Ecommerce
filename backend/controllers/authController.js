const bcrypt = require("bcrypt")
const User = require("../models/authModel")
const jwt = require("jsonwebtoken")
exports. registerUser = async (req, res) => {
    
 try {
       const { username, email , password} = req.body 
    if(!username || !email || !password){
        return res.status(400).json({
            message : "All fields are required"
        })
    }
    const hashedPassword = await bcrypt.hash(password,parseInt(process.env.SALT_ROUNDS))
    const user = await User.create({
        ...req.body,
        password : hashedPassword
    })
    res.status(201).json({
        message : "User registered successfully",
        user
    })
 } catch (error) {
    res.status(500).json({
        message : "User registration failed",
        error : error.message
    })
 }



}

exports.loginUser = async (req, res) => {
    try {
        const {email , password} = req.body;
    if(!email || !password) {
        return res.status(400).json({
            message : "All fields are required"
        })
        

    }
    const user = await User.findOne({
        email
    })
    if(!user) {
        return res.status(404).json({
            message : "User not found"
        })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
     if(!isPasswordMatch) {
        return res.status(401).json({
            message : "Invalid credentials"
        })
     }
     const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET , { expiresIn : "1d"})
     res.status(200).json({
        message : "Login successful",
        token
     })   
    } catch (error) {
        res.status(500).json({
            message : "Login failed",
            error : error.message
        })
        
    }
}