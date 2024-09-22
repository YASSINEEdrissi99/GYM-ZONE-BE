import multer from 'multer';
import path from 'path';

// Configure multer to store profile images in the 'uploads/profilusers' directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/profilusers/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const uploadProfilImage = multer({ storage: storage });

export default uploadProfilImage;
