

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

export const createPost = async (req, res) => {
    try {
        const { user_id, title, content } = req.body;
        const [rows] = await pool.query("INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)", [user_id, title, content]);
        res.status(201).json({
            status: true,
            message: "Post created successfully",
            data: rows
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

export const getPosts = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM posts");
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