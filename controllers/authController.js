import userModel from "../models/userSchema.js";
import { hashPassword, comparePassword } from "../helper/authHelper.js";
import dotenv from 'dotenv'
import jwt from "jsonwebtoken";
const Register = async (req, res) => {

    dotenv.config()

    const { name, email, password } = req.body;

    try {
        //.................................Validation
        if (!name) return res.status(201).send({ message: "Name is required" });
        if (!email) return res.status(201).send({ message: "email is required" });
        if (!password) return res.status(201).send({ message: "password is required" });

        // ................................CHECK EXISTING USER
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) { return res.status(201).send({ message: "User already exists, please login" }); }

        // hashing password
        const hashedPassword = await hashPassword(password)
        //.................................CREATING NEW USER
        const user = await new userModel({ name: name, email: email, password: hashedPassword }).save();
        return res.status(200).send({
            message: "User Created",
            user
        })

    } catch (error) {
        return res.status(500).send({ error: error, message: "error creating user" });
    }
}


const Login = async (req, res) => {
    try {
        const { email, password } = req.body

        //validation
        if (!email) return res.status(201).send({ message: "email is required" });
        if (!password) return res.status(201).send({ message: "password is required" });

        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(201).send({
                message: "User is not Registered, please register"
            })
        }
        const matchPassword = await comparePassword(password, user.password)
        if (!matchPassword) return res.status(201).send({
            message: "password incorrect"
        })

        console.log("1\n");

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '7d' });
        console.log(token);
        return res.status(200).send({
            message: "user Successfully logged in",
            name: user.name,
            email: user.email,
            phone: user.email,
            token: token
        })


    } catch (err) {
        return res.status(500).send({ error: err })
    }
}




const protectedRoute = async (req, res) => {

    return res.status(200).send({
        message: "this is a protected route",
        data: req.body.user
    })

}



export { Register, protectedRoute, Login }