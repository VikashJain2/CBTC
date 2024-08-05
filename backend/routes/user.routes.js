import express from "express";
import {
  fetchAllUsers,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-all", fetchAllUsers);
export default userRouter;
