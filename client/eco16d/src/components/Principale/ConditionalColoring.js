function getColorClassForBMID(value, bmidValues, colisBmids) {
    if (value == null || value == '') {
        return '';
    }
    if (value.toString().length !== 8) {
        return 'custom-cell-br';
    }
    const occurrences = bmidValues.filter(v => v === value).length;
    const colisOccurrences = colisBmids.filter(v => v === value).length;
    
    if (occurrences > 1) {
        return 'custom-cell-bo';
    } 
    if (colisOccurrences > 0) {
        return 'custom-cell-bg';
    } else {
        return '';
    }
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
        case 'true':
            return 'custom-cell-true';
        case true:
            return 'custom-cell-true';
        case 'FALSE':
            return 'custom-cell-false';
        case 'false':
            return 'custom-cell-false';
        case false:
            return 'custom-cell-false';
        case 'black':
            return 'custom-cell-oow';
        default:
            return 'centered-checkbox';
    }
}

export { getColorClassForCb, getColorClassForDd, getColorClassForBMID, getColorClassForIMEI };