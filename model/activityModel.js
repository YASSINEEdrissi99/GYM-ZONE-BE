import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Categories', required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  day: { type: String, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
  max_participants: { type: Number, required: true },
  location: { type: String, required: true },
  image: { type: String }, // Peut être une chaîne en base64 ou un chemin vers le fichier
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
