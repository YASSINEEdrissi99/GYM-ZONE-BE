import Event from "../model/EventModel.js";  // Assuming you have an Event model

// Create an event
// Create an event
export const createEvent = async (req, res) => {
    try {
      const { name, date, time, location, description } = req.body;
  
      // Create a new event without setting createdAt manually
      const newEvent = new Event({
        name,
        date,
        time,
        location,
        description,
      });
  
      const savedEvent = await newEvent.save();
      res.status(201).json({ message: "Event created successfully", event: savedEvent });
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  };
  

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get event by ID
export const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update an event
// Update an event
export const updateEvent = async (req, res) => {
    try {
      const eventId = req.params.id;
      const { name, date, time, location, description } = req.body;
  
      // Update the event without setting updatedAt manually
      const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        { name, date, time, location, description },
        { new: true } // This option returns the updated document
      );
  
      if (!updatedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  };
  

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findByIdAndDelete(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Register for an event
export const registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { userId } = req.body; // Assuming the user ID is passed in the request body

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user is already registered
    if (event.registrations.includes(userId)) {
      return res.status(400).json({ message: "User already registered for this event" });
    }

    // Add the user to the event's registrations
    event.registrations.push(userId);

    await event.save();

    res.status(200).json({ message: "Successfully registered for the event", event });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};


export const unregisterFromEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { userId } = req.body; // Expecting userId in the request body

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user is registered
    if (!event.registrations.includes(userId)) {
      return res.status(400).json({ message: "User not registered for this event" });
    }

    // Remove the user from the registrations array
    event.registrations = event.registrations.filter(id => id.toString() !== userId.toString());
    await event.save();

    res.status(200).json({ message: "User successfully unregistered from the event", event });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
// Check if a user is registered for an event
export const isUserRegisteredForEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { userId } = req.body; // Expecting userId in the request body

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if the user is registered
    const isRegistered = event.registrations.includes(userId);

    res.status(200).json({ isRegistered });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};



