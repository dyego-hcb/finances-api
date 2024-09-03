// /Testes/UsersTest/UserDeleteById.test.js

const request = require('supertest');
const express = require('express');

// CONTROLER
const UserController = require('../../Controllers/UserController');

// UTILS
const CheckTypeUserAuth = require('../../Utils/Authenticate/CheckTypeUserAuth');

jest.mock('../../Controllers/UserController');
jest.mock('../../Utils/Authenticate/CheckTypeUserAuth');

describe('UserController DeleteUserById Tests', () => {
    let app;
    let server;

    beforeAll(() => {
        app = express();
        app.use(express.json());
        app.delete('/users/delete/:id', CheckTypeUserAuth(['ADMIN']), UserController.deleteUserById);
        server = request(app);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 200 and delete the user if authorized', async () => {
        UserController.deleteUserById.mockImplementation((req, res) => {
            res.status(200).json({ message: "User deleted successfully" });
        });

        const response = await server
            .delete('/users/delete/1')
            .set('Authorization', 'Bearer valid_admin_token');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User deleted successfully");
        expect(UserController.deleteUserById).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
    });

    it('should return 403 if user is not authorized', async () => {
        CheckTypeUserAuth.mockImplementation(() => (req, res, next) => {
            res.status(403).json({ message: "Access Forbidden: You do not have permission to access this resource" });
        });

        const response = await server
            .delete('/users/delete/1')
            .set('Authorization', 'Bearer non_admin_token');

        expect(response.status).toBe(403);
        expect(response.body.message).toBe("Access Forbidden: You do not have permission to access this resource");
        expect(UserController.deleteUserById).not.toHaveBeenCalled();
    });

    it('should return 404 if user is not found', async () => {
        UserController.deleteUserById.mockImplementation((req, res) => {
            res.status(404).json({ message: "User not found" });
        });

        const response = await server
            .delete('/users/delete/999')
            .set('Authorization', 'Bearer valid_admin_token');

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("User not found");
        expect(UserController.deleteUserById).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
    });

    it('should return 500 if an internal error occurs', async () => {
        UserController.deleteUserById.mockImplementation((req, res) => {
            res.status(500).json({ message: "Internal Server Error" });
        });

        const response = await server
            .delete('/users/delete/1')
            .set('Authorization', 'Bearer valid_admin_token');

        expect(response.status).toBe(500);
        expect(response.body.message).toBe("Internal Server Error");
        expect(UserController.deleteUserById).toHaveBeenCalledWith(expect.any(Object), expect.any(Object));
    });
});
