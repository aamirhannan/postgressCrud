import { checkTicketExists, checkUserExists } from "../models/utilsFunctions.js";

export const checkUserExistsMiddleware = async (req, res, next) => {
    const { email } = req.body;
    const userExists = await checkUserExists(email);
    if (!userExists) {
        return res.status(404).json({ message: "User not found" });
    }
    next();
};


export const checkTicketExistsMiddleware = async (req, res, next) => {
    const { ticket_id } = req.body;
    const ticketExists = await checkTicketExists(ticket_id);
    if (!ticketExists) {
        return res.status(404).json({ message: "Ticket not available" });
    }
    next();
};

