// /Testes/UsersTest/UserGetAuth.test.js

// CONTROLLERS
const UserController = require('../../Controllers/UserController');

// UTILS
const GetUserAuth = require('../../Utils/Authenticate/GetUserAuth');

jest.mock('../../Utils/Authenticate/GetUserAuth');

describe('UserController GetAuthenticatedUser Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully get authenticated user with a valid token', async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpZCI6MywiaWF0IjoxNzI0MzE3MTUwLCJleHAiOjE3MjQzMjA3NTB9.j_Rh-q99KsbiJKQI0I2N4jrfhSrk4eAFqpPGc_CUVuo';
        const user = {
            name: 'John Doe',
            cpf: '12345678901',
            birthDate: '1990-01-01T00:00:00.000Z',
            email: 'johndoe@example.com',
            password: '$2b$10$AX0a2.VT1Go44SGSYj0t6OhGW.t6Gk7JBEz/5r/27mKUWp7iYHSoW',
            createdAt: '2024-08-22T08:06:42.832Z',
            updatedAt: '2024-08-22T08:06:42.832Z'
        };

        GetUserAuth.mockResolvedValue(user);

        const req = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await UserController.getAuthenticatedUser(req, res);

        expect(GetUserAuth).toHaveBeenCalledWith(token);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            name: user.name,
            cpf: user.cpf,
            birthDate: user.birthDate,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    });

    it('should return 401 for missing or invalid token', async () => {
        GetUserAuth.mockRejectedValue(new Error('Invalid token'));

        const req = {
            headers: {
                authorization: 'Bearer invalidToken',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await UserController.getAuthenticatedUser(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Failed to authenticate user' });
    });

    it('should return 401 if no authorization header is provided', async () => {
        const req = {
            headers: {},
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await UserController.getAuthenticatedUser(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Failed to authenticate user' });
    });

    it('should return 401 for expired token', async () => {
        GetUserAuth.mockRejectedValue(new Error('Token expired'));

        const req = {
            headers: {
                authorization: 'Bearer expiredToken',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await UserController.getAuthenticatedUser(req, res);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Token expired' });
    });

    it('should return 403 for token without sufficient privileges', async () => {
        GetUserAuth.mockRejectedValue(new Error('Insufficient privileges'));

        const req = {
            headers: {
                authorization: 'Bearer tokenWithNoPrivileges',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await UserController.getAuthenticatedUser(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ message: 'Insufficient privileges' });
    });

    it('should return 400 for malformed token', async () => {
        GetUserAuth.mockRejectedValue(new Error('Malformed token'));

        const req = {
            headers: {
                authorization: 'Bearer malformedToken',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await UserController.getAuthenticatedUser(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Malformed token' });
    });

    it('should return 500 if an error occurs in the server', async () => {
        GetUserAuth.mockRejectedValue(new Error('Internal Server Error'));

        const req = {
            headers: {
                authorization: 'Bearer validToken',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await UserController.getAuthenticatedUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
    });
});
