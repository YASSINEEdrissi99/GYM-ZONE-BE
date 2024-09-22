import express from 'express';
import {
  createRegistration,
  getAllRegistrations,
  getRegistrationById,
  updateRegistration,
  deleteRegistration,
  getRegistrationCountByActivity
} from '../controller/activityRegistrationController.js';

const router = express.Router();

// Route to create a new activity registration
router.post('/registrations', createRegistration);

// Route to get all activity registrations
router.get('/registrations', getAllRegistrations);

// Route to get a single activity registration by ID
router.get('/registrations/:id', getRegistrationById);

// Route to update an existing activity registration
router.put('/registrations/:id', updateRegistration);

// Route to delete an activity registration
router.delete('/registrations/:id', deleteRegistration);

router.get('/registrations/count/:id', getRegistrationCountByActivity);

export default router;
