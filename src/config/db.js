import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();
const { Pool } = pkg;
// console.log(process.env.DB_USER);
const pool = new Pool({
    user: process.env.DB_USER, // username
    host: process.env.DB_HOST, // host
    database: process.env.DB_DATABASE, // database name
    password: process.env.DB_PASSWORD, // password
    port: process.env.DB_PORT, // port
});

pool.on("connect", () => {
    console.log("Connected to the database");
});

pool.on("error", (err) => {
    console.log("Error connecting to the database", err);
});

export default pool;

