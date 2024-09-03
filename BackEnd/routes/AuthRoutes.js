import express from "express";

import {
  login,
  register,
  verify,
  logout,
  forgotPassword,
  changePassword
} from "../controllers/AuthController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/verify").get(verify);
router.route("/logout").get(verifyToken, logout);
router.route("/forgot-password").post(forgotPassword);
router.route("/change-password").put(changePassword);

export default router;
