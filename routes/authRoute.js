import { Router } from "express";
import { Login, Register ,protectedRoute} from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
const authRouter= Router();

//........post
authRouter.post('/register',Register)
authRouter.post('/login', Login)
authRouter.post('/protected', requireSignIn,protectedRoute)

export default authRouter;