import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} from "../controller/categoryController.js";  // Assuming the controller file is named `categoriesController.js`

const router = express.Router();

// Create a new category
router.post("/category", createCategory);

// Get all categories
router.get("/categories", getAllCategories);

// Get a specific category by ID
router.get("/category/:id", getCategoryById);

// Update a specific category by ID
router.put("/category/:id", updateCategory);

// Delete a specific category by ID
router.delete("/category/:id", deleteCategory);

export default router;
