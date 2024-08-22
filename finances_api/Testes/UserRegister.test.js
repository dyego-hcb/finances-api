const UserController = require('../Controllers/UserController');
const UserService = require('../Services/UserServices');

jest.mock('../Services/UserServices');

describe('UserController Register Tests', () => {
    it('should successfully register a user with valid data', async () => {
        UserService.registerUser.mockResolvedValue({
            id: '1',
            name: 'John Doe',
            cpf: '12345678901',
            birthDate: '1990-01-01',
            email: 'johndoe@example.com',
            password: 'password123',
        });

        const req = {
            body: {
                name: 'John Doe',
                cpf: '12345678901',
                birthDate: '1990-01-01',
                email: 'johndoe@example.com',
                password: 'password123',
                confirmPassword: 'password123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

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
        const req = {
            body: {
                cpf: '12345678901',
                birthDate: '1990-01-01',
                email: 'johndoe@example.com',
                password: 'password123',
                confirmPassword: 'password123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await UserController.registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: 'Field name is mandatory !!' });
    });

    it('should return 422 for invalid CPF', async () => {
        const req = {
            body: {
                name: 'John Doe',
                cpf: 'invalid_cpf',
                birthDate: '1990-01-01',
                email: 'johndoe@example.com',
                password: 'password123',
                confirmPassword: 'password123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await UserController.registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: 'Field cpf is mandatory and must be valid !!' });
    });

    it('should return 422 for invalid birthDate', async () => {
        const req = {
            body: {
                name: 'John Doe',
                cpf: '12345678901',
                birthDate: 'invalid_date',
                email: 'johndoe@example.com',
                password: 'password123',
                confirmPassword: 'password123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await UserController.registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: 'Field birthDate is mandatory and must be a valid date !!' });
    });

    it('should return 422 for invalid email', async () => {
        const req = {
            body: {
                name: 'John Doe',
                cpf: '12345678901',
                birthDate: '1990-01-01',
                email: 'invalid_email',
                password: 'password123',
                confirmPassword: 'password123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await UserController.registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: 'Field email is mandatory and must be valid !!' });
    });

    it('should return 422 for invalid password', async () => {
        const req = {
            body: {
                name: 'John Doe',
                cpf: '12345678901',
                birthDate: '1990-01-01',
                email: 'johndoe@example.com',
                password: 'short',
                confirmPassword: 'short'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await UserController.registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: 'Field password is mandatory and must meet security requirements !!' });
    });

    it('should return 422 for password and confirmation mismatch', async () => {
        const req = {
            body: {
                name: 'John Doe',
                cpf: '12345678901',
                birthDate: '1990-01-01',
                email: 'johndoe@example.com',
                password: 'password123',
                confirmPassword: 'different_password'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await UserController.registerUser(req, res);

        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ message: 'The password and password confirmation do not match !!' });
    });
});


