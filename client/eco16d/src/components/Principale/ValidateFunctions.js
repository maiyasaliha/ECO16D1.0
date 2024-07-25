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

function getColumnHeader(index) {
    const headers = [
        'date ajoutée', 'BMID', 'Nom du client', 'Raison du retour', 'BM Raison du retour', 'SKU', 'Nom du produit', 
        'IMEI', 'Transporteur', 'Numéro de suivi', 'Customer Informed about non-compliance', 'Customer informed if locked?', 
        'Refunded', 'Returned to SG', 'Date returned to SG', 'Waybill No.', 'Date de réception Axe', 'Contenu conforme ?', 
        'IMEI de réception', 'État de l`appareil', 'Commentaires (Rayures ? Bosses ?)', 
        'Lien Google pour les images (https://drive.google.com/drive/folders/1SNzn0LkNwHqi_IO4i-FcuWr7ytwRjS3D?usp=sharing)'
    ];

    if (index < 0 || index >= headers.length) {
        return "Index out of range";
    }

    return headers[index];
}


export { validate, getCompliance, getLocked, getWaybill, getWaybill13, getColumnHeader };