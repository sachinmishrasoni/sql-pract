import express from "express";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

export default app;
