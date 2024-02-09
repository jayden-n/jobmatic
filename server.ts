import * as dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';

// ================== ROUTERS ==================
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

// ================== PUBLIC ==================
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// ================== MIDDLEWARE ==================
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

// ================== COULDINARY ==================
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME as string,
	api_key: process.env.CLOUD_API_KEY as string,
	api_secret: process.env.CLOUD_API_SECRET as string,
});

const __dirname: string = dirname(fileURLToPath(import.meta.url));

if ((process.env.NODE_ENV as string) === 'development') {
	app.use(morgan('dev'));
}

// point to folder for static project img
app.use(express.static(path.resolve(__dirname, './client/dist')));

app.use(cookieParser());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World');
});

app.get('/api/v1/test', (req: Request, res: Response) => {
	res.json({ msg: 'test route' });
});

// ================== BASE URL ==================
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

// gonna hit the front-end since you already npm run build
app.get('*', (req: Request, res: Response) => {
	res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

//  ================== "NOT FOUND" MIDDLEWARE  ==================
app.use('*', (req: Request, res: Response) => {
	res.status(404).json({ msg: 'not found' });
});

//  ================== "ERROR" MIDDLEWARE  ==================
app.use(errorHandlerMiddleware);

const port = (process.env.PORT as unknown) || 5100;

try {
	await mongoose.connect(process.env.MONGO_URL as string);
	app.listen(port, () => {
		console.log(`server is running on ${port}...`);
	});
} catch (error) {
	console.log(error);
	process.exit(1);
}
