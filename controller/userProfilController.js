import UserProfil from '../model/UserProfilModel.js'; // Ensure the path is correct
import User from '../model/userModel.js';

// Create a user profile image
export const createUserProfil = async (req, res) => {
  try {
    const { description, user } = req.body;
    const url = req.file ? req.file.path : undefined;

    if (!description || !user) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    // Verify if the user exists
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(400).json({ message: 'Invalid user ID.' });
    }

    // Check if a user profile already exists for the same user
    const existingProfile = await UserProfil.findOne({ user });
    if (existingProfile) {
      return res.status(400).json({ message: 'A profile for this user already exists.' });
    }

    // If no profile exists, proceed with creating the new profile
    const userProfil = new UserProfil({
      url,
      user,
      description,
    });

    await userProfil.save();
    res.status(201).json({ message: 'User profile created successfully', userProfil });
  } catch (error) {
    console.error("Error creating user profile:", error);
    res.status(400).json({ message: error.message });
  }
};


// Get all user profiles
export const getAllUserProfils = async (req, res) => {
  try {
    const userProfils = await UserProfil.find().populate('user');
    res.status(200).json(userProfils);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get profile image URL by user ID
export const getProfileImageByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user profile by user ID
    const userProfile = await UserProfil.findOne({ user: userId });

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    // Ensure URL is valid
    if (!userProfile.url) {
      return res.status(404).json({ message: 'Profile image not available' });
    }

    // Return the profile image URL
    res.status(200).json({ url: userProfile.url });
  } catch (error) {
    console.error('Error fetching profile image:', error.message); // Log the error for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Get a user profile by user ID
export const getUserProfilByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user profile by user ID
    const userProfile = await UserProfil.findOne({ user: userId });

    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error.message); // Log the error for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get a user profile by ID
export const getUserProfilById = async (req, res) => {
  try {
    const userProfil = await UserProfil.findById(req.params.id).populate('user');
    if (!userProfil) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.status(200).json(userProfil);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user profile
export const updateUserProfil = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      // Update the image URL if a new image is uploaded
      updateData.url = req.file.path;
    }

    if (req.body.user) {
      const existingUser = await User.findById(req.body.user);
      if (!existingUser) {
        return res.status(400).json({ message: 'Invalid user ID.' });
      }
    }

    const updatedUserProfil = await UserProfil.findByIdAndUpdate(req.params.id, updateData, { new: true }).populate('user');
    if (!updatedUserProfil) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.status(200).json(updatedUserProfil);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user profile
export const deleteUserProfil = async (req, res) => {
  try {
    const deletedUserProfil = await UserProfil.findByIdAndDelete(req.params.id);
    if (!deletedUserProfil) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.status(200).json({ message: 'User profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




