import userModel from "../models/userSchema.js";
const Register= async (req,res)=>{

    const {name,email,password}= req.body;

    try{
        //.................................Validation
        if(!name) return res.status(201).send({message:"Name is required"});
        if(!email) return res.status(201).send({message:"email is required"});
        if(!password) return res.status(201).send({message:"password is required"});

        // ................................CHECK EXISTING USER
        const existingUser= await userModel.findOne({email:email});
        if(existingUser) return res.status(201).send({message:"User already exists, please login"});

        //.................................CREATING NEW USER
        const user= await new userModel({name:name,email:email,password:password}).save();
        return res.status(200).send({
            message:"User Created",
            user
        })

    } catch(error){
        return res.status(500).send({error:error, message:"error creating user"});
    }
}


const getController=async (req,res)=>{
    return res.send({message:"Attempt to access the auth route"});
}

export {Register, getController}