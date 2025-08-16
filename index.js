import app from "./src/app.js";
import { connectDB } from "./src/config/database.js";

const PORT = 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}\n`);
    });
});
