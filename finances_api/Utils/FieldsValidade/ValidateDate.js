// /Utils/FieldsValidade/ValidateDate.js

const isValidDate = (date) => {
    if (!date) return false;

    const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
    return isoDatePattern.test(date) && !isNaN(new Date(date).getTime());
};


module.exports = isValidDate;
