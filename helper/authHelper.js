import bcrypt from 'bcrypt'

const hashPassword= async (password)=>{

    try{
        const saltRounds=10;
        const hashedPassword= await bcrypt.hash(password,saltRounds);
        return hashedPassword;

    } catch(err){
        return res.status(500).send({message:"error hashing password", error:err})
    }
        
}

const comparePassword= async (userPassword,hashedPassword)=>{

    return bcrypt.compare(userPassword,hashedPassword)
    
}


export {hashPassword, comparePassword}