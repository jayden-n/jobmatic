import { Router } from "express";
import {
	getApplicationStats,
	getCurrentUser,
	updateUser,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorizedPermissions } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const router = Router();

router.route("/current-user").get(getCurrentUser);

router
	.route("/admin/application-stats")
	.get(authorizedPermissions("admin"), getApplicationStats);

router
	.route("/update-user")
	// must come before validation
	// upload only single file thru a valid 'avatar' name
	.patch(upload.single("avatar"), validateUpdateUserInput, updateUser);

export default router;
