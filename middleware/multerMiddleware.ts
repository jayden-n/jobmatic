import multer from 'multer';
import DataParser from 'datauri/parser.js';
import path from 'path';
import { DataURI } from 'datauri/types.js';

const storage = multer.memoryStorage();

const upload = multer({ storage });
const parser = new DataParser();

export const formatImage = (file: {
	originalname: string;
	buffer: DataURI.Input;
}) => {
	const fileExtension = path.extname(file.originalname).toString();

	// will be passed to Cloudinary
	return parser.format(fileExtension, file.buffer).content;
};

export default upload;
