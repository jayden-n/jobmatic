import { Router } from "express";
import { register, login } from "../controllers/authController.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);

export default router;
