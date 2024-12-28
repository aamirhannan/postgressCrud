import pool from "../config/db.js";

// book a ticket
export const bookTicket = async (ticketIds = [], email) => {
    // First check if user already has any tickets booked
    const existingTickets = await pool.query("SELECT ticket_id FROM tickets");

    console.log(existingTickets.rows);

    if (existingTickets.rows.length === 0) {
        // If no existing tickets, create new record
        const result = await pool.query(
            "INSERT INTO tickets (ticket_id, email) VALUES ($1, $2) RETURNING *",
            [ticketIds, email]
        );
        return result.rows[0];
    } else {
        // Get all booked tickets across all users
        const allBookedTickets = existingTickets.rows.reduce((acc, row) => {
            return [...acc, ...(row.ticket_id || [])];
        }, []);

        // Check if any requested tickets are already booked
        const alreadyBookedTickets = ticketIds.filter(id => allBookedTickets.includes(id));
        if (alreadyBookedTickets.length > 0) {
            throw new Error(`Tickets ${alreadyBookedTickets.join(', ')} are already booked`);
        }

        // Now we can safely proceed with booking since we know none of the tickets are taken
        const existingTicketsForUser = await pool.query(
            "SELECT ticket_id FROM tickets WHERE email = $1",
            [email]
        );

        // If user already has tickets, append new tickets to their existing ones
        if (existingTicketsForUser.rows.length > 0) {
            const currentUserTickets = existingTicketsForUser.rows[0].ticket_id || [];
            const updatedTickets = [...currentUserTickets, ...ticketIds];

            const result = await pool.query(
                "UPDATE tickets SET ticket_id = $1 WHERE email = $2 RETURNING *",
                [updatedTickets, email]
            );
            return result.rows[0];
        } else {
            // If user doesn't have any tickets yet, create new record
            const result = await pool.query(
                "INSERT INTO tickets (ticket_id, email) VALUES ($1, $2) RETURNING *",
                [ticketIds, email]
            );
            return result.rows[0];
        }
    }
};

// get total ticket booked
export const getTotalTicketBooked = async () => {
    const result = await pool.query("SELECT email, ticket_id FROM tickets");
    const allTickets = result.rows.reduce((acc, row) => {
        return [...acc, ...row.ticket_id];
    }, []);
    return allTickets
};

// cancel a ticket and update the table with the ticket id and email
export const cancelTicket = async (ticketId, email) => {
    const currentTickets = await pool.query("SELECT ticket_id FROM tickets WHERE email = $1", [email]);

    if (!currentTickets.rows[0] || !currentTickets.rows[0].ticket_id) {
        return null;
    }

    // Remove the specified ticketId from the array
    const updatedTicketIds = currentTickets.rows[0].ticket_id.filter(id => id !== ticketId);

    // Update the tickets table with the new array
    const result = await pool.query(
        "UPDATE tickets SET ticket_id = $1 WHERE email = $2 RETURNING *",
        [updatedTicketIds, email]
    );
    return result.rows[0];
};

