class GetUserDTO {
    constructor(name, cpf, birthDate, email, password, createdAt, updatedAt) {
        this.name = name;
        this.cpf = cpf;
        this.birthDate = birthDate;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = GetUserDTO;