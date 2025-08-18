import express from "express";
import { createPost, getPosts, } from "../controllers/post.controllers.js";

const postRoutes = express.Router();

postRoutes.post("/", createPost);
postRoutes.get("/user/:userId/posts", getPosts);
// postRoutes.get("/:id", getPostById);
// postRoutes.put("/:id", updatePost);
// postRoutes.delete("/:id", deletePost);

export default postRoutes;