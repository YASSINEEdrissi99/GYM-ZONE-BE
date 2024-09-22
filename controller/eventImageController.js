import EventImage from '../model/EventImageModel.js'; // Ensure the path and casing are correct
import Event from '../model/EventModel.js';

// Create an event image
export const createEventImage = async (req, res) => {
  try {
    const { name, event } = req.body;
    const url = req.file ? req.file.path : undefined;

    if (!name || !event) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    // Verify if the event exists
    const existingEvent = await Event.findById(event);
    if (!existingEvent) {
      return res.status(400).json({ message: 'Invalid event ID.' });
    }

    const eventImage = new EventImage({
      name,
      url,
      event,
    });

    await eventImage.save();
    res.status(201).json({ message: 'Event image created successfully', eventImage });
  } catch (error) {
    console.error("Error creating event image:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get all event images
export const getAllEventImages = async (req, res) => {
  try {
    const eventImages = await EventImage.find().populate('event');
    res.status(200).json(eventImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an event image by ID
export const getEventImageById = async (req, res) => {
  try {
    const eventImage = await EventImage.findById(req.params.id).populate('event');
    if (!eventImage) {
      return res.status(404).json({ message: 'Event image not found' });
    }
    res.status(200).json(eventImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an event image
export const updateEventImage = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      // Update the image URL if a new image is uploaded
      updateData.url = req.file.path;
    }

    if (req.body.event) {
      const existingEvent = await Event.findById(req.body.event);
      if (!existingEvent) {
        return res.status(400).json({ message: 'Invalid event ID.' });
      }
    }

    const updatedEventImage = await EventImage.findByIdAndUpdate(req.params.id, updateData, { new: true }).populate('event');
    if (!updatedEventImage) {
      return res.status(404).json({ message: 'Event image not found' });
    }
    res.status(200).json(updatedEventImage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete an event image
export const deleteEventImage = async (req, res) => {
  try {
    const deletedEventImage = await EventImage.findByIdAndDelete(req.params.id);
    if (!deletedEventImage) {
      return res.status(404).json({ message: 'Event image not found' });
    }
    res.status(200).json({ message: 'Event image deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get event images by event ID
export const getEventImagesByEventId = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Vérifier si l'événement existe (optionnel mais recommandé)
    const existingEvent = await Event.findById(eventId);
    if (!existingEvent) {
      return res.status(400).json({ message: 'Invalid event ID.' });
    }

    // Trouver toutes les images d'événements associées à l'ID de l'événement
    const eventImages = await EventImage.find({ event: eventId }).populate('event');
    if (!eventImages.length) {
      return res.status(404).json({ message: 'No event images found for this event.' });
    }
    res.status(200).json(eventImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

