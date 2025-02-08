import validator from 'validator'
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


//user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success: false, message: 'User not found'});
        }
        
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.json({success: false, message: 'Incorrect password'});
        }
        
        const token = jwt.sign({id: user._id}, process.env.JWT_Secret)
        return res.json({success: true, token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}

//user registeration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        //validate inputs
        if(!name ||!email ||!password){
            return res.json({message: 'Please enter all fields'});
        }
        
        //check if email already exists
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.json({success: false, message: 'Email already exists'});
        }

        //validating email and strong password
        if(!validator.isEmail(email)) {
            return res.json({success : false, message: 'Please enter a valid email'})
        }

        if(password.length < 8 || !validator.isStrongPassword(password)) {
            return res.json({success : false, message: 'Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a symbol'})
        }

        //hashing user passwords
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name, 
            email,
            password : hashedPassword
        })

        const user = await newUser.save()

        const token = jwt.sign({id: user.id}, process.env.JWT_Secret)
        res.json({success:true, token })

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }

}


//admin login
const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        if (email === process.env.Admin_Email && password === process.env.Admin_Password) {
            const token = jwt.sign(email+password, process.env.JWT_Secret)
            res.json({success: true, token})
        } else {
            res.json({success: false, message: 'Invalid admin credentials'})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }


}

export {loginUser, registerUser, adminLogin}