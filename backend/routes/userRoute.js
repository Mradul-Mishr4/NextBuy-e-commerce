import express from "express";
import {
  loginUser,
  loginAdmin,
  registerUser,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/admin/login", loginAdmin);
export default userRouter;
