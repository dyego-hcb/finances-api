// /Utils/FieldsValidade/ValidateZipCode.js

const isValidZipCode = (zipCode) => {
    zipCode = zipCode.replace(/[^\d]+/g, '');

    if (zipCode.length !== 8) {
        return false;
    }

    if (/^(\d)\1+$/.test(zipCode)) {
        return false;
    }

    return true;
};

module.exports = isValidZipCode;
