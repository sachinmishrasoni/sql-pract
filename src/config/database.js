import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;

export const connectDB = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("\n✅ MySQL Connected!");
        connection.release();
    } catch (err) {
        console.error("❌ MySQL Connection Failed:", err.message);
        process.exit(1);
    }
};
