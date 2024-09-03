// /Testes/UsersTest/UserUpdateAuth.test.js

const bcrypt = require('bcrypt');

// CONTROLLERS
const UserController = require('../../Controllers/UserController');

// SERVICES
const UserService = require('../../Services/UserServices');

// UTILS
const GetUserAuth = require('../../Utils/Authenticate/GetUserAuth');

jest.mock('../../Services/UserServices');
jest.mock('../../Utils/Authenticate/GetUserAuth');
jest.mock('bcrypt');

describe('UserController UpdateAuthenticatedUser Tests', () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            headers: {
                authorization: 'Bearer validToken',
            },
            body: {
                name: 'New Name',
                cpf: '12345678901',
                birthDate: '1990-01-01',
                email: 'newemail@example.com',
                oldPassword: 'password123',
                newPassword: 'newPassword123',
                confirmPassword: 'newPassword123',
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('should successfully update the authenticated user with valid data', async () => {
        const user = {
            id: 3,
            name: 'John Doe',
            cpf: '12345678901',
            birthDate: '1990-02-01',
            email: 'johndoe@example.com',
            password: '$2b$10$AX0a2.VT1Go44SGSYj0t6OhGW.t6Gk7JBEz/5r/27mKUWp7iYHSoW',
        };

        GetUserAuth.mockResolvedValue(user);
        bcrypt.compare.mockResolvedValue(true);
        bcrypt.hash.mockResolvedValue('$2b$10$newHashedPassword');
        UserService.updateUser.mockResolvedValue({
            ...user,
            name: req.body.name,
            email: req.body.email,
            password: '$2b$10$newHashedPassword',
        });

        await UserController.updateAuthenticatedUser(req, res);

        expect(GetUserAuth).toHaveBeenCalledWith('validToken');
        expect(bcrypt.compare).toHaveBeenCalledWith(req.body.oldPassword, user.password);
        expect(bcrypt.hash).toHaveBeenCalledWith(req.body.newPassword, 10);
        expect(UserService.updateUser).toHaveBeenCalledWith(user.id, expect.any(Object));
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            ...user,
            name: req.body.name,
            email: req.body.email,
            password: '$2b$10$newHashedPassword',
        });
    });

    it('should return 401 if the old password is incorrect', async () => {
        const user = {
            id: 3,
            name: 'John Doe',
            cpf: '12345678901',
            birthDate: '1990-02-01',
            email: 'johndoe@example.com',
            password: '$2b$10$AX0a2.VT1Go44SGSYj0t6OhGW.t6Gk7JBEz/5r/27mKUWp7ioW',
        };

        GetUserAuth.mockResolvedValue(user);
        bcrypt.compare.mockResolvedValue(false);

        await UserController.updateAuthenticatedUser(req, res);

        expect(GetUserAuth).toHaveBeenCalledWith('validToken');
        expect(bcrypt.compare).toHaveBeenCalledWith(req.body.oldPassword, user.password);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Old password is incorrect !!' });
    });

    it('should return 422 if oldPassword is missing', async () => {
        req.body.oldPassword = undefined;

        await UserController.updateAuthenticatedUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: 'Old password is required !!' });
    });

    it('should return 422 if newPassword is missing', async () => {
        req.body.newPassword = undefined;

        await UserController.updateAuthenticatedUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: 'New password is required !!' });
    });

    it('should return 422 if confirmPassword is missing', async () => {
        req.body.confirmPassword = undefined;

        await UserController.updateAuthenticatedUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: 'Confirm password is required !!' });
    });

    it('should return 422 if newPassword and confirmPassword do not match', async () => {
        req.body.confirmPassword = 'differentPassword123';

        await UserController.updateAuthenticatedUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: 'New password and confirmation do not match !!' });
    });

    it('should return 401 if authorization token is missing', async () => {
        req.headers.authorization = undefined;

        await UserController.updateAuthenticatedUser(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Authorization token is missing !!' });
    });

    it('should return 500 if update fails', async () => {
        const user = {
            id: 3,
            name: 'John Doe',
            cpf: '12345678901',
            birthDate: '1990-02-01',
            email: 'johndoe@example.com',
            password: '$2b$10$AX0a2.VT1Go44SGSYj0t6OhGW.t6Gk7JBEz/5r/27mKUWp7iYHSoW',
        };

        GetUserAuth.mockResolvedValue(user);
        bcrypt.compare.mockResolvedValue(true);
        bcrypt.hash.mockResolvedValue('$2b$10$newHashedPassword');
        UserService.updateUser.mockRejectedValue(new Error('Update failed'));

        await UserController.updateAuthenticatedUser(req, res);

        expect(GetUserAuth).toHaveBeenCalledWith('validToken');
        expect(UserService.updateUser).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred while updating the user' });
    });
});
