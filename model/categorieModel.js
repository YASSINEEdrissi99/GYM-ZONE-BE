import mongoose from "mongoose";

const categorieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

export default mongoose.model("Categories", categorieSchema);
