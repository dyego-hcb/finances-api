class GetUserAuthDTO {
    constructor(name, cpf, birthDate, email, password, createdAt) {
        this.name = name;
        this.cpf = cpf;
        this.birthDate = birthDate;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
    }
}

module.exports = GetUserAuthDTO;