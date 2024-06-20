import axios from 'axios';

function validate(value, otherValue) {
    if (value != "" && otherValue != "" && value == otherValue) {
        return 'green';
    }
    if (value != "" && otherValue != "" && value != otherValue) {
        return 'red';
    }
    if (value == "" || value == null) {
        return 'clear';
    }
}

function getCompliance(cellValue, value) {
    if (value == "No" || value == "Standby") {
        return cellValue;
    }
    if (cellValue == "TRUE" || cellValue == true) {
        return cellValue;
    }
}

function getLocked(cellValue, value) {
    if (value == "LOCKED") {
        return cellValue;
    }
    if (cellValue == "TRUE" || cellValue == true) {
        return cellValue;
    }
}

function getWaybill(cellValue, value) {
    if (value != "") {
        return cellValue;
    }
    if (cellValue == "TRUE" || cellValue == true) {
        return cellValue;
    }
}

function getWaybill13(cellValue, value) {
    if (value != "") {
        return cellValue;
    } 
    if (cellValue == "TRUE" || cellValue == true) {
        return cellValue;

    } else {
        return "FALSE";
    }
}

const fetchDuplicates = async (bmid) => {
    try {
        const response = await axios.get(`http://localhost:3001/BMID/${bmid}`);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export { validate, getCompliance, getLocked, getWaybill, getWaybill13, fetchDuplicates };