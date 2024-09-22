import express from "express";
import { create, getAllUsers, getUserById, update, deleteUser, login ,createUser} from "../controller/userController.js";

const route = express.Router();

route.post("/user", create);

route.post("/creatuser", createUser);
route.post("/login", login); // Add this route for login
route.get("/users", getAllUsers);
route.get("/user/:id", getUserById);
route.put("/update/user/:id", update);
route.delete("/delete/user/:id", deleteUser);

export default route;
