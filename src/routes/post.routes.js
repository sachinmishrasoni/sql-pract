import express from "express";
import { createPost, deletePostById, getPostById, getPosts, updatePostById, } from "../controllers/post.controllers.js";

const postRoutes = express.Router();

postRoutes.post("/", createPost);
postRoutes.get("/user/:userId/posts", getPosts);
postRoutes.get("/:postId", getPostById);
postRoutes.put("/:postId", updatePostById);
postRoutes.delete("/:id", deletePostById);

// User based routes
// postRoutes.get("/user/:userId/posts", getPostsByUserId);
// postRoutes.get("/user/:userId/posts/:id", getPostById);
// postRoutes.put("/user/:userId/posts/:id", updatePost);
// postRoutes.delete("/user/:userId/posts/:id", deletePost);

export default postRoutes;