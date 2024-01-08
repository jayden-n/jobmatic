import { Router } from "express";
import {
	getAllJobs,
	getSingleJob,
	createJob,
	updateJob,
	deleteJob,
} from "../controllers/jobController.js";
import {
	validateJobInput,
	validateIdParam,
} from "../middleware/validationMiddleware.js";

const router = Router();

// router.get("/", getAllJobs);
// router.post("/", createJob);

// Pointing to the same api
router.route("/").get(getAllJobs).post(validateJobInput, createJob);
router
	.route("/:id")
	.get(validateIdParam, getSingleJob)
	.patch(validateJobInput, validateIdParam, updateJob)
	.delete(validateIdParam, deleteJob);

export default router;
