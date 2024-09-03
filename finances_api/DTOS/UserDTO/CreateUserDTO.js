// /DTOS/UserDTO/CreateUserDTO.js

class CreateUserDTO {
    constructor(name, cpf, birthDate, email, password, confirmPassword) {
        this.name = name;
        this.cpf = cpf;
        this.birthDate = birthDate;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

module.exports = CreateUserDTO;