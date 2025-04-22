import express from "express";
import { authCheck, login, logout, signup, deleteAccount } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", login);
router.post("/logout", logout);

router.get("/authCheck", protectRoute, authCheck);
router.delete("/delete-account", protectRoute, deleteAccount);

export default router;
