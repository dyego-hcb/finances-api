class CreateUserDTO {
    constructor(name, cpf, birthDate, email, password, confirmPassword, createdAt) {
        this.name = name;
        this.cpf = cpf;
        this.birthDate = birthDate;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.createdAt = createdAt;
    }
}

module.exports = CreateUserDTO;