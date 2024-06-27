function getColorClassForIMEI(value) {
    if (value === '' || value === "" || value === null) {
        return '';
    } else {
        return 'custom-cell-jade';
    }
}

export { getColorClassForIMEI };
