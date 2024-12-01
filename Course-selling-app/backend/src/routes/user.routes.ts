import { Router } from "express";
import {
  checkUsername,
  userLogout,
  userPurchase,
  userSignInHandler,
  userSignupHandler,
} from "../controllers/user.controller";
import userAuthMiddleware from "../middlewares/user.auth";

const userRouter = Router();

userRouter.post("/signup", userSignupHandler);

userRouter.post("/signin", userSignInHandler);

userRouter.get("/purchases", userAuthMiddleware, userPurchase);

userRouter.get("/check-username", checkUsername);

userRouter.get("/logout", userLogout);

export default userRouter;
