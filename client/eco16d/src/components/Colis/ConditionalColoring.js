function getColorClassForBMID(value, colisBmids, principaleBmids) {
    if (value === null || value === '') {
        return '';
    }
    if (value.toString().length !== 8) {
        return 'custom-cell-br';
    }
    const colisOccurrences = colisBmids.filter(v => v === value).length;
    const principaleOccurrences = principaleBmids.filter(v => v === value).length;
    
    if (colisOccurrences > 1) {
        return 'custom-cell-bo';
    } 
    if (principaleOccurrences > 0) {
        return 'custom-cell-bg';
    } else {
        return '';
    }
}

export { getColorClassForBMID };
