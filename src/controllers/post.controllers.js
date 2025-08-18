import pool from "../config/database.js";


// POST TABLE SQL QUERY
// CREATE TABLE posts (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     user_id INT NOT NULL,
//     title VARCHAR(255) NOT NULL,
//     content TEXT,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
// );


// INSERT INTO posts (user_id, title, content) VALUES
// (1, 'My first post', 'This is my first post content'),
// (1, 'Learning MySQL', 'Practicing joins and CRUD operations'),
// (4, 'Hello World', 'Node.js with MySQL is fun!');

// CREATE POST
export const createPost = async (req, res) => {
    try {
        const { user_id, title, content } = req.body;

        if (!user_id || !title || !content) {
            return res.status(400).json({
                status: false,
                message: "User ID, title and content are required"
            });
        }

        const [result] = await pool.query(
            "INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)",
            [user_id, title, content]
        );

        res.status(201).json({
            status: true,
            message: "Post created successfully",
            data: {
                id: result.insertId,
                user_id,
                title,
                content
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Something went wrong while creating the post",
            error
        })
    }
};

// GET POSTS
export const getPosts = async (req, res) => {
    try {
        const { userId } = req.params;

        const [user] = await pool.query("SELECT * FROM posts WHERE user_id = ?", [userId]);

        if (user.length <= 0) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        const [rows] = await pool.query(
            `SELECT posts.id, posts.title, posts.content, posts.created_at
       FROM posts
       WHERE posts.user_id = ? 
       ORDER BY posts.created_at DESC`,
            [userId]
        );

        res.status(200).json({
            status: true,
            results: rows.length,
            data: rows
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Something went wrong while getting the posts",
            error
        })
    }
};