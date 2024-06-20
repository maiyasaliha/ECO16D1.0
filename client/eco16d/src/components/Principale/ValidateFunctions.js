function validate(value, otherValue) {
    if (value != "" && otherValue != "" && value == otherValue) {
        return 'green';
    } else if (value != "" && otherValue != "" && value != otherValue) {
        return 'red';
    } else {
        return 'clear';
    }
}

function getCompliance(value) {
    if (value == "No" || value == "Standby") {
        return "TRUE";
    }
}

function getLocked(value) {
    if (value == "LOCKED") {
        return "TRUE";
    }
}

function getWaybill(value) {
    if (value != "") {
        return "TRUE";
    }
}

function getWaybill13(value) {
    if (value != "") {
        return "TRUE";
    } else {
        return "FALSE";
    }
}

export { validate, getCompliance, getLocked, getWaybill, getWaybill13 };