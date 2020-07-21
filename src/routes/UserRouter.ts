import express from "express";
import { signup } from "../controllers/user/signup";
import { login } from "../controllers/user/login";

export const userRouter = express.Router();

userRouter.post("/signup", signup);

userRouter.post("/login", login);
