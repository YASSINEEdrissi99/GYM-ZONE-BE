import Activity from '../model/activityModel.js';
import Category from '../model/categorieModel.js'; // Import Category model

// Create an activity
export const createActivity = async (req, res) => {
  try {
    const { name, description, category, instructor, day, start_time, end_time, max_participants, location } = req.body;

    // Verify if the category exists
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(400).json({ message: 'Invalid category ID.' });
    }

    // Check for uploaded image file
    const image = req.file ? req.file.path : undefined;

    if (!name || !category || !instructor || !day || !start_time || !end_time || !max_participants || !location) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const activity = new Activity({
      name,
      description,
      category,
      instructor,
      day,
      start_time,
      end_time,
      max_participants,
      location,
      image,
    });

    await activity.save();
    res.status(201).json({ message: 'Activity created successfully', activity });
  } catch (error) {
    console.error("Error creating activity:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get all activities
export const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate('instructor')
      .populate('category'); // Populate category field
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an activity by ID
export const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id)
      .populate('instructor')
      .populate('category'); // Populate category field
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an activity
export const updateActivity = async (req, res) => {
  try {
    // Verify if the category exists
    if (req.body.category) {
      const existingCategory = await Category.findById(req.body.category);
      if (!existingCategory) {
        return res.status(400).json({ message: 'Invalid category ID.' });
      }
    }

    const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('instructor')
      .populate('category'); // Populate category field

    if (!updatedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json(updatedActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an activity
export const deleteActivity = async (req, res) => {
  try {
    const deletedActivity = await Activity.findByIdAndDelete(req.params.id);
    if (!deletedActivity) {
      return res.status(404).json({ message: 'Activity not found' });
    }
    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get activities by day
export const getActivitiesByDay = async (req, res) => {
  try {
    const { day } = req.params; // Get the day from the route parameters

    // Find activities that match the specified day
    const activities = await Activity.find({ day })
      .populate('instructor')
      .populate('category'); // Populate category field

    // Check if any activities were found
    if (activities.length === 0) {
      return res.status(404).json({ message: 'No activities found for this day.' });
    }

    // Return the list of activities
    res.status(200).json(activities);
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ message: error.message });
  }
};
// Import necessary modules

// Get activities by category
export const getActivitiesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params; // Get the category ID from the route parameters

    // Find activities that match the specified category
    const activities = await Activity.find({ category: categoryId })
      .populate('instructor') // Populate the instructor field
      .populate('category'); // Populate the category field

    // Check if any activities were found
    if (activities.length === 0) {
      return res.status(404).json({ message: 'No activities found for this category.' });
    }

    // Return the list of activities
    res.status(200).json(activities);
  } catch (error) {
    // Handle any errors that occur
    res.status(500).json({ message: error.message });
  }
};
