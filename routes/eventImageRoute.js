import express from 'express';
import uploadEventImage from '../config/multerConfigEvent.js'; // Make sure this is correct
import { createEventImage, getAllEventImages, getEventImageById, updateEventImage, deleteEventImage,getEventImagesByEventId } from '../controller/eventImageController.js';

const router = express.Router();

router.post('/event-images', uploadEventImage.single('image'), createEventImage); // Handle image upload
router.get('/event-images', getAllEventImages);
router.get('/event-images/:id', getEventImageById);
router.put('/event-images/:id', uploadEventImage.single('image'), updateEventImage);
router.delete('/event-images/:id', deleteEventImage);
router.get('/event-images/event/:eventId', getEventImagesByEventId);

export default router;
