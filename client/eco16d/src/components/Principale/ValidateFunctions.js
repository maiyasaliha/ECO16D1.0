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

function getColHeader(index) {
    switch (index) {
        case 0:
            return 'date ajoutée';
        case 1:
            return 'BMID';    
        case 2:
            return 'Nom du client';
        case 3:
            return 'Raison du retour';
        case 4:
            return 'BM Raison du retour';
        case 5:
            return 'SKU';
        case 6:
            return 'Nom du produit';
        case 7:
            return 'IMEI';
        case 8:
            return 'Transporteur';
        case 9:
            return 'Numéro de suivi';    
        case 10:
            return 'Customer Informed about non-compliance';
        case 11:
            return 'Customer informed if locked?';
        case 12:
            return 'Refunded';
        case 13:
            return 'Returned to SG';
        case 14:
            return 'Date returned to SG';
        case 15:
            return 'Waybill No.';
        case 16:
            return 'Date de réception Axe';
        case 17:
            return 'Contenu conforme?';
        case 18:
            return 'IMEI de réception';
        case 19:
            return 'État de l`appareil';
        case 20:
            return 'Commentaires';
        case 21:
            return 'Lien Google pour les images';
        default:
            break;                                                               
    }
}

export { validate, getCompliance, getLocked, getWaybill, getWaybill13, getColHeader };