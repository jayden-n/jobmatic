import { Router } from "express";
import { register, login } from "../controllers/authController.js";
import { validateRegisterInput } from "../middleware/validationMiddleware.js";

const router = Router();

router.route("/register").post(validateRegisterInput, register);
router.route("/login").post(validateRegisterInput, login);

export default router;
