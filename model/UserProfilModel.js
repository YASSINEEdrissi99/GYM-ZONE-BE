import mongoose from 'mongoose';

// Define the user_profil schema
const userProfilSchema = new mongoose.Schema({
  url: { 
    type: String, 
    required: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // Reference to the User model
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create the user_profil model
const UserProfil = mongoose.model('UserProfil', userProfilSchema);

export default UserProfil;
