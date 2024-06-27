function getColorClassForIMEI(value) {
    if (value === '') {
        return '';
    } else {
        return 'custom-cell-jade';
    }
}

export { getColorClassForIMEI };
