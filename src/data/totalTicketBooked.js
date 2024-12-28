import pool from "../config/db.js";

const createTotalTicketBookedTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS tickets (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        ticket_id INTEGER[] DEFAULT '{}'
    );
    `

    try {
        const result = await pool.query(queryText);
        console.log("Tickets table created successfully");
    } catch (error) {
        console.error("Error creating tickets table", error);
    }
}

export default createTotalTicketBookedTable;
