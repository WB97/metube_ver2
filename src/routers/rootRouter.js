import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController.js";
import { homepageVideos, search } from "../controllers/videoController.js";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares.js";

const rootRouter = express.Router();

rootRouter.get("/", homepageVideos);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;
