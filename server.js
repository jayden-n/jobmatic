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

// middleware
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.post("/", (req, res) => {
	console.log(req);
	res.json({ message: "data is received", data: req.body });
});

// GEL ALL JOBS
app.get("/api/v1/jobs", (req, res) => {
	res.status(200).json({ jobs });
});

// CREATE JOB
app.post("/api/v1/jobs", (req, res) => {
	const { company, position } = req.body;

	if (!company || !position) {
		return res.status(400).json({ msg: "please provide company and position" });
	}

	const id = nanoid(10);
	const job = { id, company, position };
	jobs.push(job);
	res.status(200).json({ job });
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
	console.log(`server is running on ${port}...`);
});
