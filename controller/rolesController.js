import Role from "../model/roleModel.js";

// Create a new role
export const createRole = async (req, res) => {
  try {
    const { name, description } = req.body;

    const roleExist = await Role.findOne({ name });
    if (roleExist) {
      return res.status(400).json({ message: "Role already exists" });
    }

    const newRole = new Role({ name, description });
    const savedRole = await newRole.save();
    res.status(200).json(savedRole);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get all roles
export const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get role by ID
export const getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update a role
export const updateRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Delete a role
export const deleteRole = async (req, res) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
