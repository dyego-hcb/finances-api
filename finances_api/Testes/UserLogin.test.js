const UserController = require('../Controllers/UserController');
const UserService = require('../Services/UserServices');
const CreateUserToken = require('../Utils/Authenticate/CreateToken');

jest.mock('../Services/UserServices');
jest.mock('../Utils/Authenticate/CreateToken');

describe('UserController Login Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully login a user with valid credentials', async () => {
        UserService.authenticateUser.mockResolvedValue({
            id: '3',
            email: 'johndoe@example.com',
        });

        const req = {
            body: {
                email: 'johndoe@example.com',
                password: 'password123',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        CreateUserToken.mockImplementation((user, req, res) => {
            res.status(200).json({
                message: "You Are Authenticated!",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpZCI6MywiaWF0IjoxNzI0MzE2MTc3LCJleHAiOjE3MjQzMTk3Nzd9.efl1hZ0IEwAk8rcGyvCndqcZmErSANrRGJLXtIidkdU",
                userId: user.id
            });
        });

        await UserController.loginUser(req, res);

        expect(UserService.authenticateUser).toHaveBeenCalledWith({
            email: 'johndoe@example.com',
            password: 'password123',
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "You Are Authenticated!",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpZCI6MywiaWF0IjoxNzI0MzE2MTc3LCJleHAiOjE3MjQzMTk3Nzd9.efl1hZ0IEwAk8rcGyvCndqcZmErSANrRGJLXtIidkdU",
            userId: '3'
        });
    });

    it('should return 422 for invalid email', async () => {
        const req = {
            body: {
                email: 'invalid_email',
                password: 'password123',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await UserController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: 'Field email is mandatory and must be valid !!' });
    });

    it('should return 422 for missing password', async () => {
        const req = {
            body: {
                email: 'johndoe@example.com',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await UserController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: 'Field password is mandatory !!' });
    });

    it('should return 401 for invalid credentials', async () => {
        UserService.authenticateUser.mockRejectedValue(new Error('Invalid credentials'));

        const req = {
            body: {
                email: 'johndoe@example.com',
                password: 'wrongpassword',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await UserController.loginUser(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Authentication failed' });
    });
});
