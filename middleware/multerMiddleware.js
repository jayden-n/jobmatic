import multer from 'multer';
import DataParser from 'datauri/parser.js';
import path from 'path';

const storage = multer.memoryStorage();

const upload = multer({ storage });
const parser = new DataParser();

export const formatImage = (file) => {
	const fileExtension = path.extname(file.originalname).toString();
	// will be passed to Cloudinary
	return parser.format(fileExtension, file.buffer).content;
};

export default upload;
