import { Router } from "express";
import { Register ,getController} from "../controllers/userController.js";
const authRouter= Router();

//........post
authRouter.post('/register', Register)

//........get
authRouter.get('/get-detail', getController)

export default authRouter;