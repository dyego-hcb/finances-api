const isValidCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11) {
        return false;
    }

    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += cpf.charAt(i) * (10 - i);
    }
    let result = (sum * 10) % 11;
    if (result === 10 || result === 11) {
        result = 0;
    }
    if (result != cpf.charAt(9)) {
        return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += cpf.charAt(i) * (11 - i);
    }
    result = (sum * 10) % 11;
    if (result === 10 || result === 11) {
        result = 0;
    }
    return result == cpf.charAt(10);
};

module.exports = isValidCPF;
