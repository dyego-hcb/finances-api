class Store {
    constructor(id, name, cnpj, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.cnpj = cnpj;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    getId() { return this.id; }
    setId(id) { this.id = id; }

    getName() { return this.name; }
    setName(name) { this.name = name; }

    getCnpj() { return this.cnpj; }
    setCnpj(cnpj) { this.cnpj = cnpj; }

    getCreatedAt() { return this.createdAt; }
    setCreatedAt(createdAt) { this.createdAt = createdAt; }

    getUpdatedAt() { return this.updatedAt; }
    setUpdatedAt(updatedAt) { this.updatedAt = updatedAt; }
}

module.exports = Store;
