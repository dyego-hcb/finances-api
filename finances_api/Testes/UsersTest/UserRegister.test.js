// /Testes/UsersTest/UserRegister.test.js

// CONTROLLERS
const UserController = require('../../Controllers/UserController');

// SERVICES
const UserService = require('../../Services/UserServices');

jest.mock('../../Services/UserServices');

describe('UserController Register Tests', () => {
    let req;
    let res;

    beforeEach(() => {
        jest.clearAllMocks();
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    const setupRequest = (body) => ({
        body,
    });

    it('should successfully register a user with valid data', async () => {
        UserService.registerUser.mockResolvedValue({
            id: '1',
            name: 'John Doe',
            cpf: '12345678901',
            birthDate: '1990-01-01',
            email: 'johndoe@example.com',
            password: 'password123',
        });

        req = setupRequest({
            name: 'John Doe',
            cpf: '12345678901',
            birthDate: '1990-01-01',
            email: 'johndoe@example.com',
            password: 'password123',
            confirmPassword: 'password123'
        });

        await UserController.registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            id: '1',
            name: 'John Doe',
            cpf: '12345678901',
            birthDate: '1990-01-01',
            email: 'johndoe@example.com',
            password: 'password123'
        });
    });

    it('should return 422 for missing name', async () => {
        req = setupRequest({
            cpf: '12345678901',
            birthDate: '1990-01-01',
            email: 'johndoe@example.com',
            password: 'password123',
            confirmPassword: 'password123'
        });

        await UserController.registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: 'Field name is mandatory !!' });
    });

    it('should return 422 for invalid CPF', async () => {
        req = setupRequest({
            name: 'John Doe',
            cpf: 'invalid_cpf',
            birthDate: '1990-01-01',
            email: 'johndoe@example.com',
            password: 'password123',
            confirmPassword: 'password123'
        });

        await UserController.registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: 'Field cpf is mandatory and must be valid !!' });
    });

    it('should return 422 for invalid birthDate', async () => {
        req = setupRequest({
            name: 'John Doe',
            cpf: '12345678901',
            birthDate: 'invalid_date',
            email: 'johndoe@example.com',
            password: 'password123',
            confirmPassword: 'password123'
        });

        await UserController.registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: 'Field birthDate is mandatory and must be a valid date !!' });
    });

    it('should return 422 for invalid email', async () => {
        req = setupRequest({
            name: 'John Doe',
            cpf: '12345678901',
            birthDate: '1990-01-01',
            email: 'invalid_email',
            password: 'password123',
            confirmPassword: 'password123'
        });

        await UserController.registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: 'Field email is mandatory and must be valid !!' });
    });

    it('should return 422 for invalid password', async () => {
        req = setupRequest({
            name: 'John Doe',
            cpf: '12345678901',
            birthDate: '1990-01-01',
            email: 'johndoe@example.com',
            password: 'short',
            confirmPassword: 'short'
        });

        await UserController.registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: 'Field password is mandatory and must meet security requirements !!' });
    });

    it('should return 422 for password and confirmation mismatch', async () => {
        req = setupRequest({
            name: 'John Doe',
            cpf: '12345678901',
            birthDate: '1990-01-01',
            email: 'johndoe@example.com',
            password: 'password123',
            confirmPassword: 'different_password'
        });

        await UserController.registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: 'The password and password confirmation do not match !!' });
    });

    it('should return 409 for email already registered', async () => {
        UserService.registerUser.mockRejectedValueOnce(new Error('Email already registered'));

        req = setupRequest({
            name: 'John Doe',
            cpf: '12345678901',
            birthDate: '1990-01-01',
            email: 'johndoe@example.com',
            password: 'password123',
            confirmPassword: 'password123'
        });

        await UserController.registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({ message: 'Email already registered' });
    });

    it('should return 409 for CPF already registered', async () => {
        UserService.registerUser.mockRejectedValueOnce(new Error('CPF already registered'));

        req = setupRequest({
            name: 'John Doe',
            cpf: '12345678901',
            birthDate: '1990-01-01',
            email: 'johndoe@example.com',
            password: 'password123',
            confirmPassword: 'password123'
        });

        await UserController.registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({ message: 'CPF already registered' });
    });

    it('should return 500 for unexpected server error', async () => {
        UserService.registerUser.mockRejectedValueOnce(new Error('Unexpected server error'));

        req = setupRequest({
            name: 'John Doe',
            cpf: '12345678901',
            birthDate: '1990-01-01',
            email: 'johndoe@example.com',
            password: 'password123',
            confirmPassword: 'password123'
        });

        await UserController.registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: 'Unexpected server error' });
    });
});
