const UserController = require('../Controllers/UserController');
const UserService = require('../Services/UserServices');
const GetUserAuth = require('../Utils/Authenticate/GetUserAuth');
const bcrypt = require('bcrypt');

jest.mock('../Services/UserServices');
jest.mock('../Utils/Authenticate/GetUserAuth');
jest.mock('bcrypt');

describe('UserController updateAuthenticatedUser Tests', () => {
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
