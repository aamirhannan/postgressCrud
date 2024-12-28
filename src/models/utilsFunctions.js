import pool from "../config/db.js";

export const checkUserExists = async (email) => {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);
    return result.rows.length > 0;
};

export const checkTicketExists = async (ticket_id = []) => {
    const query = "SELECT * FROM tickets WHERE ticket_id = ANY($1)";
    const result = await pool.query(query, [ticket_id]);
    return result.rows.length > 0;
};
