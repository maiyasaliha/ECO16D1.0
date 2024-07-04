function validate(value, otherValue) {
    if (isEmptyorNull(value)) {
        return 'clear';
    }
    if (!isEmptyorNull(value) && !isEmptyorNull(otherValue) && value === otherValue) {
        return 'green';
    }
    if (!isEmptyorNull(value) && !isEmptyorNull(otherValue) && value !== otherValue) {
        return 'red';
    }
}

function isEmptyorNull(value) {
    return value === "" || value === null;
}

function isTrue(value) {
    return value === true || value === "TRUE" || value === "true";
}

function getCompliance(cellValue, value) {
    if (value === "No" || value === "Standby" || isTrue(cellValue)) {
        return cellValue;
    }
}

function getLocked(cellValue, value) {
    if (value === "LOCKED" || isTrue(cellValue)) {
        return cellValue;
    }
}

function getWaybill(cellValue, value, oow) {
    if (oow?.includes("oow") || oow?.includes("OOW")) {
        if (isTrue(cellValue)) {
            return cellValue;
        } else {
            return 'black';
        }
    }
    if (value !== ""  || isTrue(cellValue)) {
        return cellValue;
    }
}

function getWaybill13(cellValue, value) {
    if (value !== "" || isTrue(cellValue)) {
        return cellValue;
    } else {
        return "FALSE";
    }
}

export { validate, getCompliance, getLocked, getWaybill, getWaybill13 };