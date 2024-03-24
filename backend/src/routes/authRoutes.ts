import { Router } from "express";
import * as SessionController from "../controllers/SessionController";
import * as UserController from "../controllers/UserController";
import isAuth from "../middleware/isAuth";
import envTokenAuth from "../middleware/envTokenAuth";
import { log } from "console";

const authRoutes = Router();

//console.log(envTokenAuth)

authRoutes.post("/signup", envTokenAuth, UserController.store);
authRoutes.post("/login", SessionController.store);
authRoutes.post("/create_token", SessionController.getToken); // criado eduardo quinhone
authRoutes.post("/refresh_token", SessionController.update);
authRoutes.delete("/logout", isAuth, SessionController.remove);
authRoutes.get("/me", isAuth, SessionController.me);

export default authRoutes;
