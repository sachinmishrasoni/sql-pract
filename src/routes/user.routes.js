import express from "express";
import { createUser, deleteUser, getUserById, getUsers, updateUser } from "../controllers/user.controllers.js";


const userRoutes = express.Router();

userRoutes.post("/", createUser);
userRoutes.get("/", getUsers);
userRoutes.get("/:id", getUserById);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

export default userRoutes;