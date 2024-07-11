function getColorClassForBMID(value, bmidValues, colisBmidsId, principaleBmids, id) {
    if (value === null || value === '') {
        return '';
    }
    if (value.toString().length !== 8) {
        return 'custom-cell-br';
    }

    const occurrences = bmidValues.filter(v => v === value).length;
    const principaleOccurrences = principaleBmids.filter(v => v === value).length;
    const colisOccurrences = colisBmidsId.filter(v => v.BMID === value);
    const colisOccurrencesId = colisOccurrences.filter(v => v._id !== id);
    let colour = false;
    
    if (colisOccurrencesId.length > 0) {
        colour = true;
    }
    if (occurrences > 1 || colisOccurrences > 1 || colour) {
        return 'custom-cell-bo';
    } 
    if (principaleOccurrences > 0) {
        return 'custom-cell-bg';
    } else {
        return '';
    }
}

export { getColorClassForBMID };