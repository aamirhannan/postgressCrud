import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pg from "pg";
import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandlers.js";
import createUserTable from "./data/createUserTable.js";
import createTotalTicketBookedTable from "./data/totalTicketBooked.js";
import ticketBookingRoutes from "./routes/ticketBookingRoutes.js";
import { checkUserExistsMiddleware, checkTicketExistsMiddleware } from "./middleware/checkUserExists.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// middleware
app.use(express.json());
app.use(cors());


// routes
app.use("/", userRoutes);
app.use("/", checkUserExistsMiddleware, ticketBookingRoutes);
// error handling middleware
app.use(errorHandler);

// create user table
createUserTable();
createTotalTicketBookedTable();

//testing postgress connection
app.get("/", async (req, res) => {
    console.log("start");
    const result = await pool.query("SELECT current_database()");
    console.log("end");
    // console.log(`database name: ${result.rows[0].current_database}`);
    res.send(`database name: ${result.rows[0].current_database}`);
});

// server running
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

