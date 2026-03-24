
const Users = require('../models/users')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    try {

        const user = await Users.create(req.body)

        if (!user) {
            return res.status(500).json({
                message: "Something went wrong ,Try again!"
            })
        }

        return res.status(201).json({
            message: "User created sucessfully!"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body

        if(!email || !password){
            return res.status(400).json({
                message:"Email and password are required!"
            })
        }

        const user = await Users.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "No User Found!"
            })
        }

        if (user.password !== password) {
            return res.status(400).json({
                message: "Invalid credentials!"
            })
        }

        const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
        );

        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
        );

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,       
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000 
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.log("error in login",error)
        return res.status(500).json({
            message: "Internal server error!",
            error: error.message
        })
    }
}

module.exports = { registerUser, loginUser }