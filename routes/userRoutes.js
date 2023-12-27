import { Router } from "express";

const userRouter= Router();

userRouter.get('/post-id', (req,res)=>{
    res.send("Post-id was accessed");
})


export default userRouter