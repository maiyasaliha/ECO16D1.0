import { fetchDuplicates } from "./ValidateFunctions";

 function getColorClassForBMID(value, length) {
    if (value.toString().length !== 8) {
        return 'custom-cell-br';
    }
    // try {
    //     const response = await fetchDuplicates(value);
    //     const length = response.data.length;

        if (length > 1) {
            return 'custom-cell-bo';
        } else {
            return 'custom-cell-bg';
        }
    // } catch (error) {
    //     console.error('Error fetching duplicates:', error);
    // }
}


function getColorClassForIMEI(value) {
    if (value === 'green') {
        return 'custom-cell-dg';
    }
    if (value === 'red') {
        return 'custom-cell-dr';
    }
    if (value === 'clear') {
        return '';
    }
}

function getColorClassForDd(value) {
    switch (value) {
        case 'Yes':
            return 'custom-cell-green';
        case 'No':
            return 'custom-cell-red';
        case 'Unlocked':
            return 'custom-cell-green';
        case 'LOCKED':
            return 'custom-cell-red';
        case 'Standby':
            return 'custom-cell-cream';
        default:
            return '';
    }
}
function getColorClassForCb(value) {
    switch (value) {
        case 'TRUE':
            return 'custom-cell-true';
        case true:
            return 'custom-cell-true';
        case 'FALSE':
            return 'custom-cell-false';
        case false:
            return 'custom-cell-false';
        default:
            return 'centered-checkbox';
    }
}

export { getColorClassForCb, getColorClassForDd, getColorClassForBMID, getColorClassForIMEI };