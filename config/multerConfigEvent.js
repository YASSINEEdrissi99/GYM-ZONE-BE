import multer from 'multer';
import path from 'path';

// Configure multer to store event images in the 'uploads/eventimage' directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/eventimage/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const uploadEventImage = multer({ storage: storage });

export default uploadEventImage;
