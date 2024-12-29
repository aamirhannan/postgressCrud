import Joi from "joi";

const ticketBookingSchema = Joi.object({
    email: Joi.string().email().required(),
    ticket_id: Joi.array().items(Joi.number()).required()
});

const cancelTicketSchema = Joi.object({
    email: Joi.string().email().required(),
});

const getTotalTicketBookedSchema = Joi.object({
    email: Joi.string().email().required()
});

export const validateTicketBooking = (req, res, next) => {
    const { error } = ticketBookingSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: "400",
            message: error.details[0].message
        });
    }
    next();
};

export const validateCancelTicket = (req, res, next) => {
    const { error } = cancelTicketSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: "400",
            message: error.details[0].message
        });
    }
    next();
};

export const validateGetTotalTicketBooked = (req, res, next) => {
    const { error } = getTotalTicketBookedSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: "400",
            message: error.details[0].message
        });
    }
    next();
};

// export default { validateTicketBooking, validateCancelTicket, validateGetTotalTicketBooked };
