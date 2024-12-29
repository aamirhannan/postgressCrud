// import { cancelTicketModel, getTicketsByEmailModel, getTotalTicketBookedModel, bookTicketModel } 

import { bookTicketModel, cancelTicketModel, getTicketsByEmailModel, getTotalTicketBookedModel } from "../models/bookTicketModel.js";

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};


export const bookSeatController = async (req, res, next) => {
    const { email, ticket_id } = req.body;
    try {
        const newTicket = await bookTicketModel(ticket_id, email);
        handleResponse(res, 201, "BOOKED_SUCCESSFULLY", newTicket);
    } catch (error) {
        next(error);
    }
};

// get total ticket booked
export const getTotalSeatBookedController = async (req, res, next) => {
    const { email } = req.body;
    try {
        const totalTickets = await getTotalTicketBookedModel().catch(() => []);
        const bookedByUser = await getTicketsByEmailModel(email).catch(() => []);
        const userTickets = bookedByUser.length > 0 ? bookedByUser[0].ticket_id : [];
        handleResponse(res, 200, "TOTAL_TICKETS_BOOKED", { "total_tickets": totalTickets, "booked_by_user": userTickets });
    } catch (error) {
        next(error);
    }
};


// cancel ticket

// fist fetc the tickey by email and ticket id
// then cancel the ticket
export const cancelTicketController = async (req, res, next) => {
    const { email } = req.body;
    try {
        const cancelledTicket = await getTicketsByEmailModel(email);
        if (cancelledTicket.length === 0) {
            handleResponse(res, 404, "NO_TICKETS_FOUND");
        } else {
            const cancelledTicket = await cancelTicketModel(email);
            handleResponse(res, 200, "CANCELLED_SUCCESSFULLY", cancelledTicket);
        }

    } catch (error) {
        next(error);
    }
};

