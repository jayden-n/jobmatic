import { Router } from "express";
import {
	getApplicationStats,
	getCurrentUser,
	updateUser,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorizedPermissions } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/current-user").get(getCurrentUser);

router
	.route("/admin/application-stats")
	.get(authorizedPermissions("admin"), getApplicationStats);

router.route("/update-user").patch(validateUpdateUserInput, updateUser);

export default router;
