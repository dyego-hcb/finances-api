// /DTOS/UserDTO/UpdateUserDTO.js

class UpdateUserDTO {
    constructor(name, cpf, birthDate, email, password) {
        this.name = name;
        this.cpf = cpf;
        this.birthDate = birthDate;
        this.email = email;
        this.password = password;
        this.updatedAt = new Date();
    }
}

module.exports = UpdateUserDTO;