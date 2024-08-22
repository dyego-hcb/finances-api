const UserController = require('../Controllers/UserController');
const GetUserAuth = require('../Utils/Authenticate/GetUserAuth');

jest.mock('../Utils/Authenticate/GetUserAuth');

describe('UserController GetAuthenticatedUser Tests', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully get authenticated user with a valid token', async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJpZCI6MywiaWF0IjoxNzI0MzE3MTUwLCJleHAiOjE3MjQzMjA3NTB9.j_Rh-q99KsbiJKQI0I2N4jrfhSrk4eAFqpPGc_CUVuo';
        const user = {
            "name": "John Doe",
            "cpf": "12345678901",
            "birthDate": "1990-01-01",
            "email": "johndoe@example.com",
            "password": "$2b$10$AX0a2.VT1Go44SGSYj0t6OhGW.t6Gk7JBEz/5r/27mKUWp7iYHSoW",
            "createdAt": "2024-08-22T08:06:42.832Z"
        }

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
            createdAt: user.createdAt
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
});
