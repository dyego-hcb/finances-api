const isValidCPF = (cpf) => /^[0-9]{11}$/.test(cpf);

module.exports = isValidCPF;
