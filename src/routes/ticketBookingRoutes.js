import express from "express";
import { validateCancelTicket, validateGetTotalTicketBooked, validateTicketBooking } from "../middleware/ticketBookingValidator.js";
import { bookSeatController, cancelTicketController, getTotalSeatBookedController } from "../controllers/bookSeatController.js";
import { checkTicketExists } from "../models/utilsFunctions.js";
// import { bookTicket, getTotalTicketBooked } from "../models/bookTicketModel.js";
// import { bookSeat, getTotalTicketBooked, cancelTicket } from "../controllers/bookSeatController.js";
// import { validateTicketBooking, validateCancelTicket, validateGetTotalTicketBooked } from "../middleware/ticketBookingValidator.js";
const router = express.Router();


router.post("/book-ticket", validateTicketBooking, bookSeatController);
router.post("/total-ticket-booked", validateGetTotalTicketBooked, getTotalSeatBookedController);
router.post("/cancel-ticket", validateCancelTicket, cancelTicketController);

export default router;
