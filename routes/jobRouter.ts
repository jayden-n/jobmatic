import express, { Router } from "express";
import {
	getAllJobs,
	getSingleJob,
	createJob,
	updateJob,
	deleteJob,
	showStats,
} from "../controllers/jobController.js";
import {
	validateJobInput,
	validateIdParam,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

const router: Router = express.Router();

// router.get("/", getAllJobs);
// router.post("/", createJob);

// Pointing to the same api
router
	.route("/")
	.get(getAllJobs)
	.post(checkForTestUser, validateJobInput, createJob);

router.route("/stats").get(showStats);
router
	.route("/:id")
	.get(validateIdParam, getSingleJob)
	.patch(checkForTestUser, validateJobInput, validateIdParam, updateJob)
	.delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
