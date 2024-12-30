import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;
// console.log(process.env.DB_USER);
// ... existing imports ...

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require"
});

// ... existing event handlers and export ...

pool.on("connect", () => {
    console.log("Connected to the database");
});

pool.on("error", (err) => {
    console.log("Error connecting to the database", err);
});

export default pool;

