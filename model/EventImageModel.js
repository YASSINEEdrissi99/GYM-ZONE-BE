import mongoose from 'mongoose';

const eventImageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const EventImage = mongoose.model('EventImage', eventImageSchema);

export default EventImage;
