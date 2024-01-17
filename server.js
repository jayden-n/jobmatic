import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// ================== ROUTERS ==================
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

// ================== PUBLIC ==================
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// ================== MIDDLEWARE ==================
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// point to public folder for static project img
app.use(express.static(path.resolve(__dirname, "./public")));

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.get("/api/v1/test", (req, res) => {
	res.json({ msg: "test route" });
});

// ================== BASE URL ==================
app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

//  ================== "NOT FOUND" MIDDLEWARE  ==================
app.use("*", (req, res) => {
	res.status(404).json({ msg: "not found" });
});

//  ================== "ERROR" MIDDLEWARE  ==================
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
	await mongoose.connect(process.env.MONGO_URL);
	app.listen(port, () => {
		console.log(`server is running on ${port}...`);
	});
} catch (error) {
	console.log(error);
	process.exit(1);
}
