const isValidDate = (date) => /^\d{4}-\d{2}-\d{2}$/.test(date) && !isNaN(new Date(date).getTime());

module.exports = isValidDate;
