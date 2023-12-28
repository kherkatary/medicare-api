import jwt from 'jsonwebtoken'
const requireSignIn=async (req,res,next)=>{
    
    try{
        const token = req.headers.authorization
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.body.user=decode
        next()
    } catch(err){
        res.status(500).send({
            message:"Please Sign IN",
            error:err
        })
    }
}

export {requireSignIn}