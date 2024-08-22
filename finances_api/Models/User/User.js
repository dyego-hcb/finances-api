const UserType = require('./UserEnum/UserTypeEnum');

class User {
    constructor(id, name, cpf, birthDate, email, password, userType, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.cpf = cpf;
        this.birthDate = birthDate;
        this.email = email;
        this.password = password;
        this.userType = this.validateType(userType);
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    validateType(userType) {
        if (!Object.values(UserType).includes(userType)) {
            throw new Error(`Invalid user type: ${userType}. Valid types are: ${Object.values(UserType).join(', ')}`);
        }
        return userType;
    }

    getId() { return this.id; }
    setId(id) { this.id = id; }

    getName() { return this.name; }
    setName(name) { this.name = name; }

    getCpf() { return this.cpf; }
    setCpf(cpf) { this.cpf = cpf; }

    getBirthDate() { return this.birthDate; }
    setBirthDate(birthDate) { this.birthDate = birthDate; }

    getEmail() { return this.email; }
    setEmail(email) { this.email = email; }

    getPassword() { return this.password; }
    setPassword(password) { this.password = password; }

    getType() { return this.type; }
    setType(type) { this.type = this.validateType(type); }

    getCreatedAt() { return this.createdAt; }
    setCreatedAt(createdAt) { this.createdAt = createdAt; }

    getUpdatedAt() { return this.updatedAt; }
    setUpdatedAt(updatedAt) { this.updatedAt = updatedAt; }
}

module.exports = User;
