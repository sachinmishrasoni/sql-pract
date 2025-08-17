import pool from "../config/database.js";

// CREATE TABLE SQL QUERY

// FOR MYSQL CLI or MYSQL WORKBENCH
// CREATE TABLE users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     email VARCHAR(100) NOT NULL UNIQUE,
//     password VARCHAR(255) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// FOR MYSQL NODE
// await pool.query(`
//     CREATE TABLE IF NOT EXISTS users (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(100) NOT NULL,
//         email VARCHAR(100) NOT NULL UNIQUE,
//         password VARCHAR(255) NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )
// `);

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "All fields are required"
            });
        }

        const [existUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existUser.length > 0) {
            return res.status(400).json({
                status: false,
                message: "User already exists"
            });
        }

        const [result] = await pool.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);

        res.status(201).json({
            status: true,
            message: "User created successfully",
            data: {
                id: result.insertId,
                name,
                email,
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Something went wrong while creating the user",
            error
        })
    }
};

export const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM users");
        // console.log(rows);
        res.status(200).json({
            status: true,
            results: rows.length,
            data: rows
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Something went wrong while getting the users",
            error
        })
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
        console.log(rows);
        if (rows.length <= 0) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            status: true,
            data: rows[0]
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Something went wrong while getting the user",
            error
        })
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        // const { name, email, password } = req.body;

        // UPDATE ALL FIELDS
        // const [rows] = await pool.query("UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?", [name, email, password, id]);

        // if (rows.affectedRows <= 0) {
        //     return res.status(404).json({
        //         status: false,
        //         message: "User not found"
        //     });
        // }
        // res.status(200).json({
        //     status: true,
        //     message: "User updated successfully"
        // });

        // UPDATE SPECIFIC FIELDS ONLY
        const fields = req.body;

        if (Object.keys(fields).length === 0) {
            return res.status(400).json({
                status: false,
                message: "At least one field is required to update"
            });
        }

        const updates = [];
        const values = [];

        for (let key in fields) {
            updates.push(`${key} = ?`);
            values.push(fields[key]);
        }
        values.push(id);
        
        const sql = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
        // console.log(updates, values, sql);
        const [rows] = await pool.query(sql, values);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            status: true,
            message: "User updated successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Something went wrong while updating the user",
            error
        })
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
        if (rows.affectedRows <= 0) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            status: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Something went wrong while deleting the user",
            error
        })
    }
};
