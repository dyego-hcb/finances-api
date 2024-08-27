class UpdateUserDTO {
    constructor(name, cpf, birthDate, email, password, updatedAt) {
        this.name = name;
        this.cpf = cpf;
        this.birthDate = birthDate;
        this.email = email;
        this.password = password;
        this.updatedAt = updatedAt;
    }
}

module.exports = UpdateUserDTO;