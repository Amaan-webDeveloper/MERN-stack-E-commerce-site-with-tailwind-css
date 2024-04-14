import { Router } from "express";
import { registerUser,loginUser, logoutUser, refreshAccessToken, getCurrentUser } from "../controllers/user.controller.js";
import { verifyJwt } from "../middleware/user.middleware.js";

const router = Router();

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJwt, logoutUser)
router.route("/refresh-access-token").post(refreshAccessToken)
router.route("/get-current-user").post(verifyJwt,getCurrentUser)
// router.route("/change_user_password").post()
export default router