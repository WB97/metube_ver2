import express from "express";
import {
  getEdit,
  postEdit,
  logout,
  see,
  startGithubLogin,
  callbackGithubLogin,
} from "../controllers/userController.js";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares.js";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/:id", see);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/callback", publicOnlyMiddleware, callbackGithubLogin);
export default userRouter;
