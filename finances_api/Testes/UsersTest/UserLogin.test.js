// /Testes/UsersTest/UserLogin.test.js

const jwt = require('jsonwebtoken');

// CONTROLLERS
const UserController = require('../../Controllers/UserController');

// SERVICES
const UserService = require('../../Services/UserServices');

// UTILS
const CreateUserToken = require('../../Utils/Authenticate/CreateToken');
const CheckAuth = require('../../Utils/Authenticate/CheckAuth');

jest.mock('../../Services/UserServices');
jest.mock('../../Utils/Authenticate/CreateToken');
jest.mock('jsonwebtoken');

describe('UserController Login Tests', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        jest.clearAllMocks();
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    const setupRequest = (body, headers = {}) => ({
        body,
        headers,
    });

    it('should successfully login a user with valid credentials', async () => {
        UserService.authenticateUser.mockResolvedValue({
            id: '3',
            email: 'johndoe@example.com',
        });

        CreateUserToken.mockImplementation((user, req, res) => {
            res.status(200).json({
                message: "You Are Authenticated!",
                token: "valid_token",
                userId: '3',
            });
        });

        req = setupRequest({
            email: 'johndoe@example.com',
            password: 'Password123@!',
        });

        await UserController.loginUser(req, res);

        expect(UserService.authenticateUser).toHaveBeenCalledWith({
            email: 'johndoe@example.com',
            password: 'Password123@!',
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "You Are Authenticated!",
            token: "valid_token",
            userId: '3',
        });
    });

    it('should return 422 for invalid email', async () => {
        req = setupRequest({
            email: 'invalid_email',
            password: 'Password123@!',
        });

        await UserController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: 'Field email is mandatory and must be valid !!' });
    });

    it('should return 422 for missing email', async () => {
        req = setupRequest({
            password: 'Password123@!',
        });

        await UserController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: 'Field email is mandatory and must be valid !!' });
    });

    it('should return 422 for missing password', async () => {
        req = setupRequest({
            email: 'johndoe@example.com',
        });

        await UserController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: 'Field password is mandatory !!' });
    });

    it('should return 401 for invalid credentials', async () => {
        UserService.authenticateUser.mockRejectedValue(new Error('Invalid credentials'));

        req = setupRequest({
            email: 'johndoe@example.com',
            password: 'wrongpassword',
        });

        await UserController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Authentication failed' });
    });

    it('should return 500 for unexpected error during authentication', async () => {
        UserService.authenticateUser.mockRejectedValue(new Error('Unexpected error'));

        req = setupRequest({
            email: 'johndoe@example.com',
            password: 'Password123@!',
        });

        await UserController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Unexpected error' });
    });

    it('should return 500 if token creation fails', async () => {
        UserService.authenticateUser.mockResolvedValue({
            id: '3',
            email: 'johndoe@example.com',
        });

        CreateUserToken.mockImplementation(() => {
            throw new Error('Token creation failed');
        });

        req = setupRequest({
            email: 'johndoe@example.com',
            password: 'Password123@!',
        });

        await UserController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Token creation failed' });
    });
});
