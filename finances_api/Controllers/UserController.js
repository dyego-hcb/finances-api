const bcrypt = require('bcrypt');
const UserService = require('../Services/UserServices');

// DTOS
const CreateUserDTO = require('../DTOS/UserDTO/CreateUserDTO');
const LoginUserDTO = require('../DTOS/UserDTO/LoginUserDTO');
const GetUserAuthDTO = require('../DTOS/UserDTO/GetUserAuthDTO');
const UpdateUserAuthDTO = require('../DTOS/UserDTO/UpdateUserAuthDTO');

// UTILS
const isValidCPF = require('../Utils/FieldsValidade/ValidateCPF');
const isValidDate = require('../Utils/FieldsValidade/ValidateDate');
const isValidEmail = require('../Utils/FieldsValidade/ValidateEmail');
const isValidPassword = require('../Utils/FieldsValidade/ValidatePassword');
const CreateUserToken = require('../Utils/Authenticate/CreateToken');
const GetUserAuth = require('../Utils/Authenticate/GetUserAuth');

class UserController {
    static async registerUser(req, res) {
        try {
            const { name, cpf, birthDate, email, password, confirmPassword } = req.body;

            if (!name) {
                return res.status(422).json({ message: "Field name is mandatory !!" });
            }
            if (!cpf || !isValidCPF(cpf)) {
                return res.status(422).json({ message: "Field cpf is mandatory and must be valid !!" });
            }
            if (!birthDate || !isValidDate(birthDate)) {
                return res.status(422).json({ message: "Field birthDate is mandatory and must be a valid date !!" });
            }
            if (!email || !isValidEmail(email)) {
                return res.status(422).json({ message: "Field email is mandatory and must be valid !!" });
            }
            if (!password || !isValidPassword(password)) {
                return res.status(422).json({ message: "Field password is mandatory and must meet security requirements !!" });
            }
            if (password !== confirmPassword) {
                return res.status(422).json({ message: "The password and password confirmation do not match !!" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const registerUserDTO = new CreateUserDTO(name, cpf, birthDate, email, hashedPassword, new Date());

            const user = await UserService.registerUser(registerUserDTO);

            res.status(201).json(user);
        } catch (error) {
            console.error('Error in UserController.registerUser:', error);
            res.status(500).json({ error: 'An error occurred while creating the user' });
        }
    }

    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !isValidEmail(email)) {
                return res.status(422).json({ message: "Field email is mandatory and must be valid !!" });
            }
            if (!password) {
                return res.status(422).json({ message: "Field password is mandatory !!" });
            }

            const loginUserDTO = new LoginUserDTO(email, password);
            const user = await UserService.authenticateUser(loginUserDTO);

            await CreateUserToken(user, req, res);
        } catch (error) {
            console.error('Error in UserController.loginUser:', error);
            res.status(401).json({ message: 'Authentication failed' });
        }
    }

    static async getAuthenticatedUser(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];

            const user = await GetUserAuth(token);

            const userAuthDTO = new GetUserAuthDTO(
                user.name,
                user.cpf,
                user.birthDate,
                user.email,
                user.password,
                user.createdAt
            );

            res.status(200).json(userAuthDTO);
        } catch (error) {
            console.error('Error in UserController.getAuthenticatedUser:', error);
            res.status(401).json({ message: 'Failed to authenticate user' });
        }
    }

    static async updateAuthenticatedUser(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const user = await GetUserAuth(token);

            const { name, cpf, birthDate, email, oldPassword, newPassword, confirmPassword } = req.body;

            if (!name && !cpf && !birthDate && !email && !newPassword) {
                return res.status(422).json({ message: "At least one field must be provided for update !!" });
            }

            let updatedPassword = user.password;

            if (oldPassword && newPassword) {
                const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
                if (!isPasswordMatch) {
                    return res.status(401).json({ message: "Old password is incorrect !!" });
                }

                if (!isValidPassword(newPassword)) {
                    return res.status(422).json({ message: "Field password is mandatory and must meet security requirements !!" });
                }

                if (newPassword !== confirmPassword) {
                    return res.status(422).json({ message: "The password and password confirmation do not match !!" });
                }

                updatedPassword = await bcrypt.hash(newPassword, 10);
            } else if ((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
                return res.status(422).json({ message: "Both old and new passwords must be provided together !!" });
            }

            const updateUserDTO = new UpdateUserAuthDTO(
                name || user.name,
                cpf || user.cpf,
                birthDate || user.birthDate,
                email || user.email,
                updatedPassword,
                new Date()
            );

            const updatedUser = await UserService.updateUser(user.id, updateUserDTO);

            res.status(200).json(updatedUser);
        } catch (error) {
            console.error('Error in UserController.updateAuthenticatedUser:', error);
            res.status(500).json({ error: 'An error occurred while updating the user' });
        }
    }
}

module.exports = UserController;
