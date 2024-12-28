import { bookTicket, getTotalTicketBooked } from "../models/bookTicketModel.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};


export const bookSeat = async (req, res, next) => {
    const { email, ticket_id } = req.body;
    try {
        const newTicket = await bookTicket(ticket_id, email);
        handleResponse(res, 201, "Ticket booked successfully", newTicket);
    } catch (error) {
        next(error);
    }
};

// get total ticket booked
export const getTotalSeatBooked = async (req, res, next) => {
    try {
        const totalTickets = await getTotalTicketBooked();
        handleResponse(res, 200, "Total tickets booked", totalTickets);
    } catch (error) {
        next(error);
    }
};

