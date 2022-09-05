import express from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserController } from "../controller/UserController";
import { UserDatabase } from "../data/UserDatabase";


export const userRouter = express.Router();

const userDatabase = new UserDatabase()
const userBusiness = new UserBusiness(userDatabase)
const userController = new UserController(userBusiness);

userRouter.post("/signup",(res, req) =>  userController.signup(res, req));
userRouter.post("/login",(res, req) => userController.login(res,req));