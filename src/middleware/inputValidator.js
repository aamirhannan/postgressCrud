import Joi from "joi";

const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required()
});

const signinSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(30).required()
});

export const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: "400",
            message: error.details[0].message
        });
    }
    next();
};

export const validateSignin = (req, res, next) => {
    const { error } = signinSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            status: "400",
            message: error.details[0].message
        });
    }
    next();
};