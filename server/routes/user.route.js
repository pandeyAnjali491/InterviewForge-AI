import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.get("/current-user",isAuth,getUser);

export default userRouter;