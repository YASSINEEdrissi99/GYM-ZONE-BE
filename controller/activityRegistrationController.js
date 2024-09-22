import mongoose from 'mongoose';
import ActivityRegistration from "../model/activityRegistrationModel.js";

// Create a new activity registration
export const createRegistration = async (req, res) => {
  try {
    const { activity, user } = req.body;

    // Basic validation
    if (!activity || !user) {
      return res.status(400).json({ message: "Activity and user IDs are required." });
    }

    const newRegistration = new ActivityRegistration({ activity, user });
    const savedRegistration = await newRegistration.save();

    res.status(201).json({ message: "Registration created successfully.", savedRegistration });
  } catch (error) {
    console.error("Error creating registration:", error.message);
    res.status(500).json({ errorMessage: "An error occurred while creating registration." });
  }
};

// Get all registrations
export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await ActivityRegistration.find()
      .populate('activity', 'name description')
      .populate('user', 'name email');

    res.status(200).json(registrations);
  } catch (error) {
    console.error("Error fetching registrations:", error.message);
    res.status(500).json({ errorMessage: "An error occurred while fetching registrations." });
  }
};

// Get a single registration by ID
export const getRegistrationById = async (req, res) => {
  try {
    const { id } = req.params;

    const registration = await ActivityRegistration.findById(id)
      .populate('activity', 'name')
      .populate('user', 'name');

    if (!registration) {
      return res.status(404).json({ message: "Registration not found." });
    }

    res.status(200).json(registration);
  } catch (error) {
    console.error("Error fetching registration:", error.message);
    res.status(500).json({ errorMessage: "An error occurred while fetching registration details." });
  }
};

// Update a registration
export const updateRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const { activity, user, registration_date } = req.body;

    // Validate that activity and user are present
    if (!activity || !user) {
      return res.status(400).json({ message: "Activity and user IDs are required for update." });
    }

    const updatedRegistration = await ActivityRegistration.findByIdAndUpdate(
      id,
      { activity, user, registration_date: new Date(registration_date) },
      { new: true }
    );

    if (!updatedRegistration) {
      return res.status(404).json({ message: "Registration not found." });
    }

    res.status(200).json({ message: "Registration updated successfully.", updatedRegistration });
  } catch (error) {
    console.error("Error updating registration:", error.message);
    res.status(500).json({ errorMessage: "An error occurred while updating registration." });
  }
};

// Delete a registration
export const deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRegistration = await ActivityRegistration.findByIdAndDelete(id);

    if (!deletedRegistration) {
      return res.status(404).json({ message: "Registration not found." });
    }

    res.status(200).json({ message: "Registration deleted successfully." });
  } catch (error) {
    console.error("Error deleting registration:", error.message);
    res.status(500).json({ errorMessage: "An error occurred while deleting registration." });
  }
};


export const getRegistrationCountByActivity = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid activity ID" });
    }

    // Count the number of registrations where the 'activity' field matches the given id
    const registrationCount = await ActivityRegistration.countDocuments({ activity: id });

    // Return the count in the response, even if it's 0
    res.status(200).json({ activityId: id, registrationCount });
  } catch (error) {
    // Log and return a 500 error response with the error message
    console.error('Error counting registrations:', error.message);
    res.status(500).json({ errorMessage: error.message });
  }
};


