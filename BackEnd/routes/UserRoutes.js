import express from "express";

import { getAllUsers, getUserById } from "../controllers/UserController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/").get(verifyToken, getAllUsers);
router.route("/:id").get(verifyToken, getUserById);

export default router;
