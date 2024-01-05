import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import { nanoid } from "nanoid";

let jobs = [
	{
		id: nanoid(),
		company: "apple",
		position: "front-end",
	},
	{
		id: nanoid(),
		company: "amazon",
		position: "back-end",
	},
	{
		id: nanoid(),
		company: "google",
		position: "full-stack",
	},
];

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}
// ========= MIDDLEWARE =========
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.post("/", (req, res) => {
	console.log(req);
	res.json({ message: "data is received", data: req.body });
});

// ========= GEL ALL JOBS =========
app.get("/api/v1/jobs", (req, res) => {
	res.status(200).json({ jobs });
});

// ========= CREATE JOB =========
app.post("/api/v1/jobs", (req, res) => {
	const { company, position } = req.body;

	if (!company || !position) {
		return res.status(400).json({ msg: "please provide company and position" });
	}

	const id = nanoid(10);
	const job = { id, company, position };
	jobs.push(job);

	// 201: creating a resource
	res.status(201).json({ job });
});

//  ========= GET SINGLE JOB  =========
app.get("/api/v1/jobs/:id", (req, res) => {
	const { id } = req.params;
	const job = jobs.find((job) => job.id === id);
	if (!job) {
		return res.status(404).json({ msg: `no job with id ${id}` });
	}

	res.status(200).json({ job });
});

//  ========= UPDATE JOB  =========
app.patch("/api/v1/jobs/:id", (req, res) => {
	const { company, position } = req.body;
	if (!company || !position) {
		return res.status(404).json({ msg: "please provide company and position" });
	}

	const { id } = req.params;
	const job = jobs.find((job) => job.id === id);

	if (!job) {
		return res.status(404).json({ msg: `no job with id ${id}` });
	}

	job.company = company;
	job.position = position;

	res.status(200).json({ msg: "job modified!", job });
});

//  ========= DELETE JOB  =========
app.delete("/api/v1/jobs/:id", (req, res) => {
	const { id } = req.params;
	const job = jobs.find((job) => job.id === id);
	if (!job) {
		return res.status(404).json({ msg: `no job with id ${id}` });
	}

	const newJobs = jobs.filter((job) => job.id !== id);
	jobs = newJobs;

	res.status(200).json({ msg: "job deleted" });
});

//  ========= "NOT FOUND" MIDDLEWARE  =========
app.use("*", (req, res) => {
	res.status(404).json({ msg: "not found" });
});

//  ========= "ERROR" MIDDLEWARE  =========
app.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({ msg: "something went wrong" });
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
	console.log(`server is running on ${port}...`);
});
