import express from "express";
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole
} from "../controller/rolesController.js";

const router = express.Router();

router.post("/role", createRole);           // Create a new role
router.get("/roles", getAllRoles);          // Get all roles
router.get("/role/:id", getRoleById);       // Get a specific role by ID
router.put("/role/:id", updateRole);        // Update a specific role by ID
router.delete("/role/:id", deleteRole);     // Delete a specific role by ID

export default router;
