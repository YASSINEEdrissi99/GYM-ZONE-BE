import express from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  unregisterFromEvent,
  isUserRegisteredForEvent
} from "../controller/EventController.js"; // Assuming the correct path for the EventController

const router = express.Router();

// Route to create an event
router.post("/event", createEvent);

// Route to get all events
router.get("/events", getAllEvents);

// Route to get an event by its ID
router.get("/event/:id", getEventById);

// Route to update an event
router.put("/event/:id", updateEvent);

// Route to delete an event
router.delete("/event/:id", deleteEvent);

// Route to register for an event
router.post("/event/:id/register", registerForEvent);

// Add to your routes file
router.post('/event/:id/unregister', unregisterFromEvent);
router.post("/event/:id/is-registered", isUserRegisteredForEvent);

export default router;
