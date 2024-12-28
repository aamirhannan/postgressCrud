import { createUserService, deleteUserService, getAllUsersService, getUserByEmailService, getUserByIdService, updateUserService } from "../models/userModel.js";

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

// get all users controller
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService();
        users.forEach(user => {
            delete user.password;
        });
        handleResponse(res, 200, "USERS_FETCHED_SUCCESS", users);
    } catch (error) {
        next(error);
    }
};

// get user by id controller
export const getUserById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await getUserByIdService(id);
        if (!user) {
            return handleResponse(res, 404, "USER_NOT_FOUND");
        }
        handleResponse(res, 200, "USER_FETCHED_SUCCESS", user);
    } catch (error) {
        next(error);
    }
};

// update user controller
export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const updatedUser = await updateUserService(id, name, email);
        if (!updatedUser) {
            return handleResponse(res, 404, "USER_NOT_FOUND");
        }
        handleResponse(res, 200, "USER_UPDATED_SUCCESS", updatedUser);
    } catch (error) {
        next(error);
    }
};

// delete user controller
export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const deletedUser = await deleteUserService(id);
        if (!deletedUser) {
            return handleResponse(res, 404, "USER_NOT_FOUND");
        }
        handleResponse(res, 200, "USER_DELETED_SUCCESS", deletedUser);
    } catch (error) {
        next(error);
    }
};

export { handleResponse };
