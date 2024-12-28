import express from "express";
import { validateCancelTicket, validateGetTotalTicketBooked, validateTicketBooking } from "../middleware/ticketBookingValidator.js";
import { bookSeat, getTotalSeatBooked } from "../controllers/bookSeatController.js";
import { checkTicketExists } from "../models/utilsFunctions.js";
// import { bookTicket, getTotalTicketBooked } from "../models/bookTicketModel.js";
// import { bookSeat, getTotalTicketBooked, cancelTicket } from "../controllers/bookSeatController.js";
// import { validateTicketBooking, validateCancelTicket, validateGetTotalTicketBooked } from "../middleware/ticketBookingValidator.js";
const router = express.Router();


router.post("/book-ticket", validateTicketBooking, bookSeat);
router.post("/total-ticket-booked", validateGetTotalTicketBooked, getTotalSeatBooked);
// router.post("/cancel-ticket", validateCancelTicket, cancelTicket);

export default router;
