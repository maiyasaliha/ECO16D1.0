function getColorClassForBMID(value, bmidValues) {
    if (value == null || value == '') {
        return '';
    }
    if (value.toString().length !== 8) {
        return 'custom-cell-br';
    }
    const occurrences = bmidValues.filter(v => v === value).length;
    
    if (occurrences > 1) {
        return 'custom-cell-bo';
    } else {
        return 'custom-cell-bg';
    }
}
