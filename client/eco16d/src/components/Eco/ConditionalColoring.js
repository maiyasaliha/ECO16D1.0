function getColorClassForIMEI(cellValue) {
    if (cellValue == "") {
        return '';
    } else {
        return 'custom-cell-jade';
    }
}

export { getColorClassForIMEI };
