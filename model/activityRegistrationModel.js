// activityRegistrationModel.js
import mongoose from "mongoose";

const activityRegistrationSchema = new mongoose.Schema({
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity", // Reference to the Activity table
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User table for the registered user
    required: true
  },
  registration_date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true }); // Automatically add createdAt and updatedAt fields

export default mongoose.model("ActivityRegistration", activityRegistrationSchema);



