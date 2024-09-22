import express from 'express';
import upload from '../config/multerConfig.js'; // Importer multer
import { createActivity, getAllActivities, getActivityById, updateActivity, deleteActivity ,getActivitiesByDay,getActivitiesByCategory } from '../controller/activityController.js';

const router = express.Router();

router.post('/activities', upload.single('image'), createActivity); // Gérer l'upload d'une image
router.get('/activities', getAllActivities);
router.get('/activities/:id', getActivityById);
router.put('/activities/:id', upload.single('image'), updateActivity); // Gérer la mise à jour de l'image
router.delete('/activities/:id', deleteActivity);
router.get('/activities/day/:day', getActivitiesByDay);
router.get('/activities/category/:categoryId', getActivitiesByCategory);
export default router;
