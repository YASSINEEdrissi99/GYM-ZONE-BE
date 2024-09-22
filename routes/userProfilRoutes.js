import express from 'express';
import uploadProfilImage from '../config/multerConfigProfil.js'; // Ensure the path is correct
import { createUserProfil, getUserProfilByUserId, getProfileImageByUserId, getAllUserProfils, getUserProfilById, updateUserProfil, deleteUserProfil } from '../controller/userProfilController.js';

const router = express.Router();

router.post('/user-profil', uploadProfilImage.single('image'), createUserProfil); // Handle image upload
router.get('/user-profil', getAllUserProfils);
router.get('/user-profil/:id', getUserProfilById);
router.put('/user-profil/:id', uploadProfilImage.single('image'), updateUserProfil);
router.delete('/user-profil/:id', deleteUserProfil);
router.get('/user-profil/image/:userId', getProfileImageByUserId);
router.get('/user-profil/user/:userId', getUserProfilByUserId);

export default router;
