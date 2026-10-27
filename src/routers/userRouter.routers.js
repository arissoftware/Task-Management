import { Router } from "express";
import {
  createUser,
  dashboard,
  login,
} from "../controllers/userAuth.controller.js";
import { authenticate } from "../auth/authenticate.js";

const userRouter = Router();

userRouter.post("/register", createUser);
userRouter.post("/login", login);
userRouter.get("/me", authenticate, dashboard);

export default userRouter;
