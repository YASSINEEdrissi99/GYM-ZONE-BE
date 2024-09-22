import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  Chatusers: {
    type: Array,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, { timestamps: true });

const Message = mongoose.model("Message", MessageSchema);

export default Message;
