import express from "express";

import {
  createProvider,
  getAllProvider,
  getProviderById,
  updateProvider,
  deleteProvider,
} from "../controllers/ProviderController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.route("/").post(verifyToken, createProvider);
router.route("/").get(getAllProvider);
router.route("/:id").get(getProviderById);
router.route("/:id").put(verifyToken, updateProvider);
router.route("/:id").delete(verifyToken, deleteProvider);

export default router;
