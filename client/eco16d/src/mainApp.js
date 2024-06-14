document.addEventListener('DOMContentLoaded', function() {
    var container = document.getElementById('hot');
    var data = [
        ['Name', 'Age', 'Country'],
        ['John', 25, 'USA'],
        ['Alice', 30, 'UK'],
        ['Bob', 35, 'Canada']
    ];

    var hot = new Handsontable(container, {
        data: data,
        rowHeaders: true,
        colHeaders: true,
        contextMenu: true,
        dropdownMenu: true,
        licenseKey: 'non-commercial-and-evaluation',
        language: 'en-US',
        stretchH: 'all',
        manualRowResize: true,
        manualColumnResize: true,
        // Add more options as per your requirement
    });
});
