import User from "../model/userModel.js";
import Role from "../model/roleModel.js"; // Import Role model
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find the "Su" role
    const suRole = await Role.findOne({ name: "Simple User" });
    if (!suRole) {
      return res.status(500).json({ message: "Default role 'Su' not found" });
    }

    // Create a new user with the "Su" role
    const newUser = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      roles: suRole._id // Assign the "Su" role
    });

    const saveData = await newUser.save();
    res.status(200).json({ saveData });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};



// Méthode spécifique pour créer un utilisateur depuis la page AddUser
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Trouver le rôle spécifié
    const selectedRole = await Role.findById(role);
    if (!selectedRole) {
      return res.status(400).json({ message: "Invalid role selected" });
    }

    // Créer un nouvel utilisateur avec le rôle sélectionné
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      roles: selectedRole._id
    });

    const saveData = await newUser.save();
    res.status(200).json({ saveData });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
 
    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a token (if you're using JWT for session management)
    const token = jwt.sign({ id: user._id }, 'yassineElidrissi99', { expiresIn: '1h' });

    // Send response with user data and token
    res.status(200).json({ 
      message: "Login successful",
      token
    });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getAllUsers = async (req, res) => {
    try {
      const userData = await User.find();
      if (!userData || userData.length === 0) {
        return res.status(404).json({ message: "User data not found." });
      }
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  };
  
  export const getUserById = async (req, res) => {
    try {
      const id = req.params.id;
      const userExist = await User.findById(id);
      if (!userExist) {
        return res.status(404).json({ message: "User not found." });
      }
      res.status(200).json(userExist);
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  };
  

  

  
  // Update user
  export const update = async (req, res) => {
    try {
      const id = req.params.id;
      const { name, email, password, role } = req.body;
  
      // Find the user being updated
      const userExist = await User.findById(id);
      if (!userExist) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Check if the new email is already taken by another user
      if (email && email !== userExist.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
          return res.status(400).json({ message: "Email is already in use." });
        }
      }
  
      // Hash password if it's being updated
      let hashedPassword;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }
  
      // Update user data
      const updatedData = {
        name,
        email,
        password: hashedPassword || userExist.password, // Use existing password if not updated
        roles: role || userExist.roles, // Use existing role if not provided
        updated_at: Date.now() // Update the date
      };
  
      const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
  
      res.status(200).json({ message: "User updated successfully.", updatedUser });
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  };
  
  
  
  
  
  export const deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      const userExist = await User.findById(id);
      if (!userExist) {
        return res.status(404).json({ message: "User not found." });
      }
      await User.findByIdAndDelete(id);
      res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      res.status(500).json({ errorMessage: error.message });
    }
  };
