import { createUserService, getUserByEmailService } from "../models/userModel.js";

// standard response hadler
const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};

// create user controller
export const createUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await createUserService(name, email, password);
        handleResponse(res, 201, "SIGNUP_SUCCESS", newUser);
    } catch (error) {
        next(error);
    }
};

// handle user signin controller
export const handleUserSignin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await getUserByEmailService(email);
        if (!user) {
            return handleResponse(res, 404, "SIGNIN_FAILED");
        }
        if (user.password !== password) {
            return handleResponse(res, 401, "SIGNIN_FAILED");
        }
        handleResponse(res, 200, "SIGNIN_SUCCESS", user);
    } catch (error) {
        next(error);
    }
};

export { handleResponse };
