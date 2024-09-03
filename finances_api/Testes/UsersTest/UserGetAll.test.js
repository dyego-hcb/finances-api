// /Testes/UsersTest/UserGetAll.test.js

const request = require('supertest');
const express = require('express');

// CONTROLER
const UserController = require('../../Controllers/UserController');

// UTILS
const CheckTypeUserAuth = require('../../Utils/Authenticate/CheckTypeUserAuth');

jest.mock('../../Controllers/UserController');
jest.mock('../../Utils/Authenticate/CheckTypeUserAuth');

describe('UserController GetAllUsers Tests', () => {
    let app;
    let server;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.get('/users/all', CheckTypeUserAuth(['ADMIN']), UserController.getAllUsers);
        server = request(app);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 200 and list of users if authorized', async () => {
        const mockUsers = [{ id: 1, name: 'User1' }, { id: 2, name: 'User2' }];
        UserController.getAllUsers.mockImplementation((req, res) => {
            res.status(200).json(mockUsers);
        });

        const response = await server.get('/users/all').set('Authorization', 'Bearer valid_admin_token');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUsers);
        expect(UserController.getAllUsers).toHaveBeenCalled();
    });

    it('should return 403 if user is not authorized', async () => {
        CheckTypeUserAuth.mockImplementation(() => (req, res, next) => {
            res.status(403).json({ message: "Access Forbidden: You do not have permission to access this resource" });
        });

        const response = await server.get('/users/all').set('Authorization', 'Bearer non_admin_token');

        expect(response.status).toBe(403);
        expect(response.body.message).toBe("Access Forbidden: You do not have permission to access this resource");
        expect(UserController.getAllUsers).not.toHaveBeenCalled();
    });

    it('should return 500 if an internal error occurs', async () => {
        UserController.getAllUsers.mockImplementation((req, res) => {
            res.status(500).json({ message: "Internal Server Error" });
        });

        const response = await server.get('/users/all').set('Authorization', 'Bearer valid_admin_token');

        expect(response.status).toBe(500);
        expect(response.body.message).toBe("Internal Server Error");
        expect(UserController.getAllUsers).toHaveBeenCalled();
    });
});
