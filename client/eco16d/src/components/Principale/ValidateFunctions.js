function validate(value, otherValue) {
    if (isEmptyOrNull(value)) {
        return 'clear';
    }
    if (!isEmptyOrNull(value) && !isEmptyOrNull(otherValue) && value == otherValue) {
        return 'green';
    }
    if (!isEmptyOrNull(value) && !isEmptyOrNull(otherValue) && value != otherValue) {
        return 'red';
    }
}

function isEmptyOrNull(value) {
    return value === "" || value === null;
}

function getCompliance(cellValue, value) {
    if (value === "No" || value === "Standby" || cellValue === "TRUE" || cellValue === true) {
        return cellValue;
    }
}

function getLocked(cellValue, value) {
    if (value === "LOCKED" || cellValue === "TRUE" || cellValue === true) {
        return cellValue;
    }
}

function getWaybill(cellValue, value) {
    if (value !== ""  || cellValue === "TRUE" || cellValue === true) {
        return cellValue;
    }
}

function getWaybill13(cellValue, value) {
    if (value !== "" || cellValue === "TRUE" || cellValue === true) {
        return cellValue;
    } else {
        return "FALSE";
    }
}

export { validate, getCompliance, getLocked, getWaybill, getWaybill13 };