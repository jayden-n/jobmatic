import { Router } from "express";
import {
	getApplicationStats,
	getCurrentUser,
	updateUser,
} from "../controllers/userController.js";

const router = Router();

router.route("/current-user").get(getCurrentUser);
router.route("/admin/application-stats").get(getApplicationStats);
router.route("/update-user").patch(updateUser);

export default router;
